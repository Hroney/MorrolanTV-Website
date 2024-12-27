import dotenv from 'dotenv';

dotenv.config();

let cache = {
    isLive: null,
    videoId: null,
    lastChecked: 0,
    channelId: 'UC130oC2JmKYmdPQhJ2tVLog',
};

const CACHE_DURATION = 1 * 60 * 1000;

const fetchStreamStatus = async (channelId, apiKey) => {
    console.log("cache ", cache)
    try {
        // Step 1: Check the most recent video IDs
        const activitiesUrl = `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=3&key=${apiKey}`;
        const activitiesResponse = await fetch(activitiesUrl);
        const activitiesData = await activitiesResponse.json();

        let recentVideoId = null;

        // Loop through the first three activities to find a valid video ID
        for (let i = 0; i < Math.min(activitiesData.items.length, 3); i++) {
            const videoId = activitiesData.items[i]?.contentDetails?.upload?.videoId;
            if (videoId) {
                recentVideoId = videoId;
                break;
            }
        }

        if (!recentVideoId) {
            console.log("No recent video found.");
            return null;
        }

        // Step 2: Use the Videos list to check if the recent video is live
        const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${recentVideoId}&key=${apiKey}`;
        const videoResponse = await fetch(videoUrl);
        const videoData = await videoResponse.json();
        const liveStatus = videoData.items[0]?.snippet.liveBroadcastContent;

        // Update the cache
        const isLive = liveStatus === 'live';
        console.log("videoId", recentVideoId);
        return { isLive, videoId: recentVideoId };

    } catch (error) {
        console.error('Error fetching stream status:', error);
        return null;
    }
};

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
} 