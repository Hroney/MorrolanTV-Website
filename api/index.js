import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

let cache = {
  isLive: null,
  videoId: null,
  lastChecked: 0,
  channelId: 'UC130oC2JmKYmdPQhJ2tVLog', // Initialize channelId
};

const CACHE_DURATION = 1 * 60 * 1000; // 15 minutes

// Function to fetch the live status or most recent video
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
        break; // Stop once we find a valid video ID
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

// API route for stream status
app.get('/api/stream-status', async (req, res) => {
  console.log("cache ", cache)
  const { channelId } = req.query;
  // eslint-disable-next-line no-undef
  const apiKey = process.env.YOUTUBE_API_KEY;
  const now = Date.now();

  // Return cached result if valid and channelId matches
  if (
    now - cache.lastChecked < CACHE_DURATION &&
    cache.channelId === channelId // Check if the channelId is the same
  ) {
    console.log('Returning cached stream status');
    return res.json({
      isLive: cache.isLive,
      videoId: cache.videoId,
    });
  }

  // Fetch new stream status if cache is invalid or channelId is different
  const streamStatus = await fetchStreamStatus(channelId, apiKey);
  if (streamStatus) {
    // Update cache
    cache = { ...streamStatus, lastChecked: now, channelId }; // Update the channelId in the cache
    return res.json(streamStatus);
  } else {
    return res.status(500).json({ error: 'Failed to fetch stream status' });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;