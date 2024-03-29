import { Button } from "@mui/base";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";

const Camera = () => {
  const [camera, setCamera] = useState<boolean | null>(false);
  const [buttonText, setButtonText] = useState<string | null>("Allumer caméra");
  const [status, setStatus] = useState<boolean | null>(false);
  const [photos, setPhotos] = useState<string[] | []>([]);
  const videoRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("listPhoto", JSON.stringify(photos));
  }, [photos]);

  const startCamera = async () => {
    if (camera == false) {
      setCamera(true);
      setButtonText("Eteindre la caméra");
    } else {
      setCamera(false);
      setButtonText("Allumer caméra");
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      const data = canvas.toDataURL("image/png");
      setPhotos([...photos, data]);
    }
  };

  return (
    <Box>
      <Typography>Camera</Typography>
      {camera && (
        <Box>
          <video ref={videoRef} autoPlay />
          <Button onClick={takePhoto}>Prendre une photo</Button>
        </Box>
      )}
      <Button onClick={startCamera}>{buttonText}</Button>
      {photos &&
        photos.map((photo) => <Box component="img" alt="image" src={photo} />)}
    </Box>
  );
};

export default Camera;
