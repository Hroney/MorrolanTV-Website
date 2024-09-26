import React from 'react';

export class OfflineVideo extends React.Component {
    render() {
        const { videoId } = this.props;

        return (
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}>
            </iframe>
        )
    }

}


