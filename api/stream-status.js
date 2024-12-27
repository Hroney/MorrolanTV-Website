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
    videosLastChecked: 0
};

const fetchStreamStatus = async (channelId, apiKey) => {
    try {
        // First, fetch the videos list
        const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`;

        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
            throw new Error(`YouTube search API error: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        const recentVideos = searchData.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium,
            publishedAt: item.snippet.publishedAt
        }));

        // Then check live status
        const activitiesUrl = `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=3&key=${apiKey}`;
        const activitiesResponse = await fetch(activitiesUrl);
        const activitiesData = await activitiesResponse.json();

        let recentVideoId = null;
        for (let i = 0; i < Math.min(activitiesData.items.length, 3); i++) {
            const videoId = activitiesData.items[i]?.contentDetails?.upload?.videoId;
            if (videoId) {
                recentVideoId = videoId;
                break;
            }
        }

        const result = {
            isLive: false,
            videoId: recentVideoId,
            recentVideos: recentVideos
        };

        return result;

    } catch (error) {
        throw error;
    }
};

// Development server setup
if (process.env.NODE_ENV !== 'production') {
    app.get('/api/stream-status', async (req, res) => {
        const { channelId } = req.query;
        const apiKey = process.env.YOUTUBE_API_KEY;
        const now = Date.now();

        if (
            now - cache.lastChecked < CACHE_DURATION &&
            cache.channelId === channelId
        ) {
            console.log('Returning cached stream status');
            return res.json({
                isLive: cache.isLive,
                videoId: cache.videoId,
            });
        }

        const streamStatus = await fetchStreamStatus(channelId, apiKey);
        if (streamStatus) {
            cache = { ...streamStatus, lastChecked: now, channelId };
            return res.json(streamStatus);
        } else {
            return res.status(500).json({ error: 'Failed to fetch stream status' });
        }
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Development API server running on http://localhost:${PORT}`);
    });
}

// Export the handler for Vercel
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