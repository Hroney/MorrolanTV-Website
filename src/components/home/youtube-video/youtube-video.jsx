export class YoutubeVideo extends React.Component {
    render() {
        const { isLive, videoId, selectedVideoId } = this.props;
        const currentVideoId = selectedVideoId || videoId;
        console.log('YoutubeVideo render - Props:', { isLive, videoId, selectedVideoId });
        console.log('Using video ID:', currentVideoId);

        const vidsource = `https://www.youtube.com/embed/${currentVideoId}`;
        const iframe_source = (
            <iframe
                src={vidsource}
                allowFullScreen
                id="video-live"
            />
        );

        return (
            <div id="video-live">
                {currentVideoId ? iframe_source : <p>No video available.</p>}
            </div>
        );
    }
} 