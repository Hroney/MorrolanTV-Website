// home-helpers.jsx
const fetchStreamStatus = async (channelId) => {
    try {
        const apiUrl = '/api/stream-status';
        const response = await fetch(`${apiUrl}?channelId=${channelId}`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();

        if (!data || (data.isLive === undefined && !data.recentVideos)) {
            throw new Error('Invalid response structure from API');
        }

        return data;
    } catch (error) {
        return { isLive: false, videoId: null, recentVideos: [] };
    }
};

export { fetchStreamStatus };
