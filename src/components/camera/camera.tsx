import { Button } from "@mui/base";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";

const Camera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [camera, setCamera] = useState<boolean | null>(false);
  const [buttonText, setButtonText] = useState<string | null>("Allumer caméra");
  const [status, setStatus] = useState<boolean | null>(false);
  const [photos, setPhotos] = useState<string | null>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    localStorage.setItem("listPhoto", JSON.stringify(photos));
  }, [photos]);

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
    if (camera == false) {
      setCamera(true);
      setButtonText("Eteindre la caméra");
    } else {
      setCamera(false);
      setButtonText("Allumer caméra");
    }
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

  const takePhoto = () => {
    // if (canvasRef.current && videoRef.current) {
    //   const context = canvasRef.current.getContext("2d");
    //   context?.drawImage(videoRef.current, 0, 0, 300, 200);
    //   const data = canvasRef.current.toDataURL('"image/png"');
    //   setPhotos((prevPhotos) => [...prevPhotos, data]);
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(stream, 0, 0, canvas.width, canvas.height);

    const url = canvas.toDataURL("image/jpeg");
    setPhotos(url);
    // canvasRef.current.toBlob((blob: any) => {
    //   // const newImg = document.createElement("img");
    //   const url = URL.createObjectURL(blob);

    //   // newImg.onload = () => {
    //   //   // no longer need to read the blob so it's revoked
    //   //   URL.revokeObjectURL(url);
    //   // };

    //   // newImg.src = url;
    //   // console.log(newImg.src);
    //   alert(url);
    //   setPhotos(url);
    // });
    // }
  };

  return (
    <Box>
      <Typography>Camera</Typography>
      {camera && (
        <Box>
          <video
            autoPlay
            ref={(video) => {
              if (video && stream) {
                video.srcObject = stream;
              }
            }}></video>
          <Button onClick={takePhoto}>Prendre une photo</Button>
        </Box>
      )}
      <Button onClick={getMedia}>{buttonText}</Button>
      <Box component="img" alt="image" src={photos}></Box>
    </Box>
  );
};

export default Camera;
