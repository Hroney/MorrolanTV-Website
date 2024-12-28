import React from 'react';

export class LiveVideo extends React.Component {
    render() {
        const { channelId } = this.props;

        return (
            <iframe
                id="video-live"
                frameBorder="0"
                loading="lazy"
                title="YouTube live stream"
                src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${channelId}&enablejsapi=0&rel=0&modestbranding=1&controls=1&origin=${window.location.origin}`}>
            </iframe>
        )
    }
}
