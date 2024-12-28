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
        // Get uploads playlist ID (costs 1 unit)
        const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
        const channelResponse = await fetch(channelUrl);
        if (!channelResponse.ok) {
            throw new Error(`Channel API error: ${channelResponse.status}`);
        }
        const channelData = await channelResponse.json();

        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // Get recent videos from uploads playlist (costs 1 unit)
        const playlistUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${apiKey}`;
        const playlistResponse = await fetch(playlistUrl);
        if (!playlistResponse.ok) {
            throw new Error(`Playlist API error: ${playlistResponse.status}`);
        }
        const playlistData = await playlistResponse.json();

        const recentVideos = playlistData.items.map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium,
            publishedAt: item.snippet.publishedAt
        }));

        // Update cache
        cache = {
            isLive: false,
            videoId: recentVideos[0]?.id || null,
            recentVideos: recentVideos,
            lastChecked: now,
            videosLastChecked: now,
            channelId: channelId
        };

        return {
            isLive: false,
            videoId: recentVideos[0]?.id || null,
            recentVideos: recentVideos
        };

    } catch (error) {
        console.error('Error in fetchStreamStatus:', error);
        throw error;
    }
};

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