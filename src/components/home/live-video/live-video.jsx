import React from 'react';

export class LiveVideo extends React.Component {
    render() {
        const { channelId } = this.props;

        return (
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/live_stream?channel=${channelId}`}>
            </iframe>
        )
    }

}


