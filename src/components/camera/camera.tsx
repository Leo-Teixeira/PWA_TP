import { Button } from "@mui/base";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";

const Camera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  async function getStream() {
    let didCancel = false;

    const getUserMedia = async () => {
      if (!didCancel) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          setStream(mediaStream);
        } catch (err) {
          ///tzetyze
        }
      }
    };

    getUserMedia();

    return () => {
      didCancel = true;
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }

  async function getMedia() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(mediaStream);
      getStream();
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  }

  return (
    <Box>
      <Typography>Test</Typography>
      <video
        autoPlay
        ref={(video) => {
          if (video && stream) {
            video.srcObject = stream;
          }
        }}></video>
      <Button onClick={getMedia}>Allumer caméra</Button>
    </Box>
  );
};

export default Camera;
