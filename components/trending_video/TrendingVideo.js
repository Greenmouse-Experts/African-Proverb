import React from "react";
import { Player } from "video-react";

export default ({ proverbId }) => {
  return (
    <video
      className="rounded-lg"
      //   ref={videoRef}
      //   onPlay={handleVideoPlay}
      //   src={"https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}
      src="https://api.africanproverbs.com/munaapi/api/proverbs/video/ff16cb46-116e-4d76-a16e-f8b515a90cb0.mp4"
      //   src={`${BASE_URL}/api/proverbs/video/${proverbId}.mp4`}
      poster={
        "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679468939/defaultposter_iyrwyk.jpg"
      }
      width="720px"
      height="480px"
      controls
      controlsList="nodownload"
      preload="none"
    ></video>
    // <Player>
    //   <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    // </Player>
  );
};

// import React, { useState, useRef, useEffect } from "react";
// import { Player } from "video-react";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";

// const PlayerExample = () => {
//   const [playerSource, setPlayerSource] = useState(
//     "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
//   );
//   const [inputVideoUrl, setInputVideoUrl] = useState(
//     "http://www.w3schools.com/html/mov_bbb.mp4"
//   );
//   const playerRef = useRef(null);

//   const handleValueChange = (e) => {
//     const { value } = e.target;
//     setInputVideoUrl(value);
//   };

//   const updatePlayerInfo = () => {
//     setPlayerSource(inputVideoUrl);
//   };

//   useEffect(() => {
//     if (playerSource !== inputVideoUrl) {
//       playerRef.current.load();
//     }
//   }, [playerSource, inputVideoUrl]);

//   return (
//     <Player ref={playerRef} videoId="video-1">
//       <source src={playerSource} />
//     </Player>
//   );
// };

// export default PlayerExample;
