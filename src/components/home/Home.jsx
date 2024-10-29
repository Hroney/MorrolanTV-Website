import React from 'react';
// import { Scroller } from './promo/scroller';
import { TwitchChat } from './twitch-chat/twitch-chat';
import { YoutubeChat } from './youtube-chat/youtube-chat';
import { OfflineVideo } from './offline-video/offline-video';
import { LiveVideo } from './live-video/live-video';
import { fetchStreamStatus } from './home-helpers';
import './home.css';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLive: false,
      videoId: null,
      channelId: 'UC130oC2JmKYmdPQhJ2tVLog',
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const streamStatus = await fetchStreamStatus(this.state.channelId);
      this.setState({
        isLive: streamStatus.isLive,
        videoId: streamStatus.videoId,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching stream status:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { isLive, videoId, channelId, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <section id="home-section-wrapper">
        {/* <Scroller /> */}
        {isLive ? (
          <div id="home-content-wrapper-live">
            <TwitchChat />
            <LiveVideo channelId={channelId} />
            <YoutubeChat isLive={isLive} videoId={videoId} />
          </div>
        ) : (
          <div id="home-content-wrapper">
            <div className="home-content-section">
              <OfflineVideo videoId={videoId} />
            </div>
            <div className="home-content-section" id="color">
              Hello
            </div>
            <div className="home-content-section">
              Hello 2
            </div>
          </div>
        )}
      </section>
    );
  }
}
