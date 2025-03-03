import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export default ({ proverbId }) => (
  <AudioPlayer
    // autoPlay
    src="https://api.africanproverbs.com/munaapi/api/proverbs/audio/ff16cb46-116e-4d76-a16e-f8b515a90cb0.mp3"
    // src={`${BASE_URL}/api/proverbs/audio/${proverbId}.mp3`}
    // src="https://samples-files.com/samples/Audio/mp3/sample-file-1.mp3"
    // onPlay={(e) => console.log("onPlay")}
    // other props here
  />
);
