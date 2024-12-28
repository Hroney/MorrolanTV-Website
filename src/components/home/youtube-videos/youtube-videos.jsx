import React from 'react';
import './youtube-videos.css';

export class YoutubeVideos extends React.Component {
    handleVideoClick = (videoId) => {
        console.log('Video clicked with ID:', videoId);
        this.props.onVideoSelect(videoId);

        // Scroll the content wrapper to the top
        const contentWrapper = document.getElementById('home-content-wrapper');
        if (contentWrapper) {
            contentWrapper.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    render() {
        const { videos } = this.props;

        if (!videos || videos.length === 0) {
            return <div>No videos available</div>;
        }

        const topRow = videos.slice(0, 5);
        const bottomRow = videos.slice(5, 10);

        return (
            <div className="youtube-videos-container">
                <div className="youtube-videos-row">
                    {topRow.map(video => (
                        <div
                            key={video.id}
                            className="video-card"
                            onClick={() => this.handleVideoClick(video.id)}
                        >
                            <img
                                src={video.thumbnail.url}
                                alt={video.title}
                                width={video.thumbnail.width}
                                height={video.thumbnail.height}
                            />
                            <h3>{video.title}</h3>
                        </div>
                    ))}
                </div>
                <div className="youtube-videos-row">
                    {bottomRow.map(video => (
                        <div
                            key={video.id}
                            className="video-card"
                            onClick={() => this.handleVideoClick(video.id)}
                        >
                            <img
                                src={video.thumbnail.url}
                                alt={video.title}
                                width={video.thumbnail.width}
                                height={video.thumbnail.height}
                            />
                            <h3>{video.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
} 