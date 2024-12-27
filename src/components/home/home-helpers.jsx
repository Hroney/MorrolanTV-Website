// home-helpers.jsx
const fetchStreamStatus = async (channelId) => {
    console.log("channelId", channelId)
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? '/api/stream-status'
            : 'https://morrolantv.vercel.app/api/stream-status';

        const response = await fetch(`${apiUrl}?channelId=${channelId}`);
        console.log(response)
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
