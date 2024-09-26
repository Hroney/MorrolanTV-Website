// streamHelpers.js

export const getLiveVideoIdFromChannel = async (channelId, apiKey) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("CHANNEL DATA", data)

        if (data.items && data.items.length > 0) {
            return data.items[0].id.videoId; // Get the live video ID from the first result
        } else {
            return null; // No live video found
        }
    } catch (error) {
        console.error('Error fetching live video ID:', error);
        return null;
    }
};

export const checkIfStreamIsLive = async (channelId, apiKey, lastChecked, setState) => {
    const now = Date.now();
    if (now - lastChecked < 20 * 60 * 1000) {
        // Only check if 10 minutes have passed
        return;
    }

    // Fetch the live video ID from the channel
    const videoId = await getLiveVideoIdFromChannel(channelId, apiKey);

    if (!videoId) {
        // If not live, get the most recent video
        const mostRecentVideoId = await getMostRecentVideoFromChannel(channelId, apiKey);

        setState({
            isLive: false,
            videoId: mostRecentVideoId,
            lastChecked: now,
        });
        return;
    }

    // Fetch details of the live video (if available)
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(videoDetailsUrl);
        const data = await response.json();
        console.log(data);

        const liveStatus = data.items[0].snippet.liveBroadcastContent;
        setState({
            isLive: liveStatus === 'live',
            videoId: videoId,
            lastChecked: now,
        });
    } catch (error) {
        console.error('Error fetching YouTube video details:', error);
        setState({
            isLive: false,
            videoId: null,
            lastChecked: now,
        });
    }
};



export const setupStreamCheckInterval = (checkStreamFunc) => {
    const interval = setInterval(checkStreamFunc, 20 * 60 * 1000);
    return interval;
};

export const clearStreamCheckInterval = (interval) => {
    if (interval) {
        clearInterval(interval);
    }
};


export const getMostRecentVideoFromChannel = async (channelId, apiKey) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            return data.items[0].id.videoId; // Get the video ID of the most recent video
        } else {
            return null; // No videos found
        }
    } catch (error) {
        console.error('Error fetching most recent video:', error);
        return null;
    }
};