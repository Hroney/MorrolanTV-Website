// home-helpers.jsx
const fetchStreamStatus = async (channelId) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? '/api/stream-status'
            : `https://morrolantv.vercel.app/api/stream-status`;

        const response = await fetch(`${apiUrl}?channelId=${channelId}`);

        // Add more detailed logging
        console.log("API Response Status:", response.status);
        console.log("API Response Headers:", Object.fromEntries(response.headers));

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        // Ensure the response has the expected structure
        if (data.isLive === undefined || data.videoId === undefined) {
            throw new Error('Invalid response structure from API');
        }

        return data;
    } catch (error) {
        console.error('Failed to fetch stream status:', error);
        // Return a default object instead of throwing
        return { isLive: false, videoId: null };
    }
};

export { fetchStreamStatus };
