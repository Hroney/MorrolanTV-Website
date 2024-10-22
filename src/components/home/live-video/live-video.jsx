import React from 'react';

export class LiveVideo extends React.Component {
    render() {
        const { channelId } = this.props;

        return (
            <iframe
                id="video-live"
                frameBorder="0"
                src={`https://www.youtube.com/embed/live_stream?channel=${channelId}`}>
            </iframe>
        )
    }

}
