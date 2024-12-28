import React from 'react';
import { Scroller } from './promo/scroller';
import { TwitchChat } from './twitch-chat/twitch-chat';
import { YoutubeChat } from './youtube-chat/youtube-chat';
import { OfflineVideo } from './offline-video/offline-video';
import { LiveVideo } from './live-video/live-video';
import { About } from '../about/About'
import { fetchStreamStatus } from './home-helpers';
import './home.css';
import { YoutubeVideos } from './youtube-videos/youtube-videos';
import { getVideosFromCache, setVideosToCache } from '../../utils/videoCache';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLive: false,
      videoId: null,
      channelId: 'UC130oC2JmKYmdPQhJ2tVLog',
      loading: true,
      recentVideos: [],
      selectedVideoId: null
    };
  }

  async componentDidMount() {
    try {
      // First check cache for videos
      const cachedVideos = getVideosFromCache();
      if (cachedVideos) {
        this.setState({ recentVideos: cachedVideos });
      }

      // Fetch stream status and potentially new videos
      const streamStatus = await fetchStreamStatus(this.state.channelId);

      // If we got new videos from the API, update cache
      if (streamStatus.recentVideos && streamStatus.recentVideos.length > 0) {
        setVideosToCache(streamStatus.recentVideos);
        this.setState({ recentVideos: streamStatus.recentVideos });
      }

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

  handleVideoSelect = (videoId) => {
    console.log('handleVideoSelect called with ID:', videoId);
    this.setState({ selectedVideoId: videoId }, () => {
      console.log('State updated, new selectedVideoId:', this.state.selectedVideoId);
    });
  };

  render() {
    const { isLive, videoId, channelId, loading, selectedVideoId } = this.state;

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
              <OfflineVideo videoId={selectedVideoId || videoId} />
            </div>
            <div className="home-content-section" id="color">
              <YoutubeVideos videos={this.state.recentVideos} onVideoSelect={this.handleVideoSelect} />
            </div>
            <div className="home-content-section">
              <About />
            </div>
          </div>
        )}
      </section>
    );
  }
}
