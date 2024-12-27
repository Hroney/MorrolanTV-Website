const VIDEO_CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const getVideosFromCache = () => {
    try {
        const cached = localStorage.getItem(VIDEO_CACHE_KEY);
        if (!cached) return null;

        const { videos, timestamp } = JSON.parse(cached);

        // Check if cache is expired
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(VIDEO_CACHE_KEY);
            return null;
        }

        return videos;
    } catch (error) {
        console.error('Error reading from cache:', error);
        return null;
    }
};

export const setVideosToCache = (videos) => {
    try {
        const cacheData = {
            videos,
            timestamp: Date.now()
        };
        localStorage.setItem(VIDEO_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error writing to cache:', error);
    }
}; 