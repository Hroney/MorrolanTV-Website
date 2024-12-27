import React from 'react';
import './youtube-videos.css';

export class YoutubeVideos extends React.Component {
    render() {
        const { videos } = this.props;

        if (!videos || videos.length === 0) {
            return <div>No videos available</div>;
        }

        // Split videos into two rows
        const topRow = videos.slice(0, 5);
        const bottomRow = videos.slice(5, 10);

        return (
            <div className="youtube-videos-container">
                <div className="youtube-videos-row">
                    {topRow.map(video => (
                        <a
                            key={video.id}
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-card"
                        >
                            <img
                                src={video.thumbnail.url}
                                alt={video.title}
                                width={video.thumbnail.width}
                                height={video.thumbnail.height}
                            />
                            <h3>{video.title}</h3>
                        </a>
                    ))}
                </div>
                <div className="youtube-videos-row">
                    {bottomRow.map(video => (
                        <a
                            key={video.id}
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-card"
                        >
                            <img
                                src={video.thumbnail.url}
                                alt={video.title}
                                width={video.thumbnail.width}
                                height={video.thumbnail.height}
                            />
                            <h3>{video.title}</h3>
                        </a>
                    ))}
                </div>
            </div>
        );
    }
} 