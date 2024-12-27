import React from 'react';
import './youtube-chat.css';

export class YoutubeChat extends React.Component {
    render() {
        const { isLive, videoId } = this.props;
        const vidsource = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}`;
        const iframe_source = (
            <iframe
                src={vidsource}
                allowFullScreen
                id="home-iframe-chat"
            />
        );

        return (
            <div id="home-div-chat">
                {isLive ? iframe_source : <p>Stream is not live.</p>}
            </div>
        );
    }
}
