import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
dotenv.config();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const VIDEOS_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

let cache = {
    isLive: null,
    videoId: null,
    recentVideos: [],
    lastChecked: 0,
    videosLastChecked: 0,
    channelId: null
};

const fetchStreamStatus = async (channelId, apiKey) => {
    // Check cache first
    const now = Date.now();
    if (cache.recentVideos.length > 0 &&
        cache.channelId === channelId &&
        (now - cache.videosLastChecked) < VIDEOS_CACHE_DURATION) {
        return {
            isLive: cache.isLive,
            videoId: cache.videoId,
            recentVideos: cache.recentVideos
        };
    }

    try {
        // Get uploads playlist ID
        const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
        const channelResponse = await fetch(channelUrl);
        if (!channelResponse.ok) {
            throw new Error(`Channel API error: ${channelResponse.status}`);
        }
        const channelData = await channelResponse.json();

        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // Get recent videos from uploads playlist
        const playlistUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,status&playlistId=${uploadsPlaylistId}&maxResults=30&key=${apiKey}`;
        const playlistResponse = await fetch(playlistUrl);
        if (!playlistResponse.ok) {
            throw new Error(`Playlist API error: ${playlistResponse.status}`);
        }
        const playlistData = await playlistResponse.json();

        // Get video details to check for livestreams
        const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',');
        const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${apiKey}`;
        const videoResponse = await fetch(videoUrl);
        if (!videoResponse.ok) {
            throw new Error(`Video API error: ${videoResponse.status}`);
        }
        const videoData = await videoResponse.json();

        // Create a map of video details
        const videoDetails = new Map(
            videoData.items.map(item => [item.id, item])
        );

        // Get the most recent video ID (including livestreams) for the player
        const mostRecentVideo = playlistData.items[0]?.snippet.resourceId.videoId || null;

        // Filter out livestreams for the video list
        let recentVideos = [];
        for (const item of playlistData.items) {
            const videoId = item.snippet.resourceId.videoId;
            const videoDetail = videoDetails.get(videoId);

            // Skip if it's a livestream
            if (videoDetail?.liveStreamingDetails) {
                continue;
            }

            recentVideos.push({
                id: videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium,
                publishedAt: item.snippet.publishedAt
            });

            // Break once we have 10 regular videos
            if (recentVideos.length === 10) break;
        }

        // Update cache
        cache = {
            isLive: false,
            videoId: mostRecentVideo,
            recentVideos: recentVideos,
            lastChecked: now,
            videosLastChecked: now,
            channelId: channelId
        };

        return {
            isLive: false,
            videoId: mostRecentVideo,
            recentVideos: recentVideos
        };

    } catch (error) {
        console.error('Error in fetchStreamStatus:', error);
        throw error;
    }
};

// Helper function to parse ISO 8601 duration to seconds
function parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    return hours * 3600 + minutes * 60 + seconds;
}

// Export for Vercel
export default async function handler(req, res) {
    try {
        const { channelId } = req.query;
        const apiKey = process.env.YOUTUBE_API_KEY;

        if (!apiKey) {
            throw new Error('YouTube API key is not configured');
        }

        const result = await fetchStreamStatus(channelId, apiKey);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

// Development server setup
if (process.env.NODE_ENV !== 'production') {
    app.get('/api/stream-status', async (req, res) => {
        await handler(req, res);
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Development API server running on http://localhost:${PORT}`);
    });
}