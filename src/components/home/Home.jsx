import React from 'react';
import { Scroller } from './promo/scroller';
import { TwitchChat } from './twitch-chat/twitch-chat';
import { YoutubeChat } from './youtube-chat/youtube-chat';
import { OfflineVideo } from './offline-video/offline-video'
import { LiveVideo } from './live-video/live-video';
import { checkIfStreamIsLive, setupStreamCheckInterval, clearStreamCheckInterval } from './home-helpers';
import './home.css';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLive: false,
      videoId: null,
      lastChecked: 0,
      channelId: 'UCJRsrXVPx3awXJX6WkFz4Dw',
      apiKey: 'AIzaSyAlyu7GhxWxIs6HHS996nteWaIPJP6jYGI',
    };
    this.checkInterval = null;
  }

  componentDidMount() {
    const streamCheckFunc = () => checkIfStreamIsLive(
      this.state.channelId, // Replace with the YouTube Channel ID
      this.state.apiKey, // Replace with your YouTube API key
      this.state.lastChecked,
      this.setState.bind(this)
    );

    streamCheckFunc();
    this.checkInterval = setupStreamCheckInterval(streamCheckFunc);
  }

  componentWillUnmount() {
    clearStreamCheckInterval(this.checkInterval);
  }

  render() {
    const { isLive, videoId } = this.state;

    console.log("isLive, videoId", isLive, videoId)

    return (
      <section id="home-section-wrapper">
        <Scroller />
        {isLive &&
          <div id="home-content-wrapper">
            <TwitchChat />
            <LiveVideo channelId={"UCJRsrXVPx3awXJX6WkFz4Dw"} />
            <YoutubeChat isLive={isLive} videoId={videoId} />
          </div>
        }
        {!isLive &&
          <OfflineVideo videoId={videoId} />
        }
      </section>
    );
  }
}
