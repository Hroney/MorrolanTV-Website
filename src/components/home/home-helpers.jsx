// home-helpers.jsx
const fetchStreamStatus = async (channelId) => {
    console.log("channelId", channelId)
    try {
        const response = await fetch(`/api/stream-status?channelId=${channelId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch stream status from server:', error);
        throw error; // Propagate the error for handling in the component
    }
};

export { fetchStreamStatus };
