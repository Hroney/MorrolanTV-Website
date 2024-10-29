import React from 'react';

export class OfflineVideo extends React.Component {
    render() {
        // eslint-disable-next-line react/prop-types
        const { videoId } = this.props;

        return (
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                src={`https://www.youtube.com/embed/${videoId}`}
            >
            </iframe>
        )
    }

}
