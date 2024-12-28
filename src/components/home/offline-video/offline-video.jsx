import React from 'react';

export class OfflineVideo extends React.Component {
    render() {
        const { videoId } = this.props;

        return (
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=0&rel=0&modestbranding=1&controls=1&origin=${window.location.origin}`}
                title="YouTube video player"
            >
            </iframe>
        )
    }
}
