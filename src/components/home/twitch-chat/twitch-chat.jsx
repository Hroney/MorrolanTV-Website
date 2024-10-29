import React from 'react';
import './twitch-chat.css';

export class TwitchChat extends React.Component {
    render = () => (
        <div id="home-div-chat">
            <iframe
                src="https://www.twitch.tv/embed/morrolantv/chat?darkpopout&parent=localhost"
                id='home-iframe-chat'
                height="100%"
                width="100%"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    )
}
