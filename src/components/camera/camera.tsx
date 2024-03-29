import { Button } from "@mui/base";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";

const Camera = () => {
  const [camera, setCamera] = useState<boolean | null>(false);
  const [buttonText, setButtonText] = useState<string | null>("Allumer caméra");
  const [online, setOnline] = useState<boolean | null>(navigator.onLine);
  const [photos, setPhotos] = useState<
    Map<string, { photo: string; online: boolean | null }>
  >(new Map());
  const videoRef = useRef<any>();

  useEffect(() => {
    localStorage.setItem("listPhoto", JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setPhotos((prevPhotos) => {
        const updatedPhotos = new Map(prevPhotos);
        updatedPhotos.forEach((photo) => {
          photo.online = true;
        });
        return updatedPhotos;
      });
    };

    const handleOffline = () => {
      setOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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
      if (videoRef.current && videoRef.current.srcObject){
        videoRef.current.srcObject = stream;
      }else{
        // videoRef.current.srcObject = null;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      if (canvas && videoRef.current && videoRef.current.videoWidth && videoRef.current.videoHeight) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

        const data = canvas.toDataURL("image/png");
        setPhotos((prevPhotos) => {
            const newPhotos = new Map(prevPhotos);
            newPhotos.set(`photo_${prevPhotos.size + 1}`, {
            photo: data,
            online: online,
            });
            return newPhotos;
        });
      }
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
      {photos && (Array.from(photos.entries()).map(([key, photo]) => (
        <Box key={key}>
          <Typography>Online: {photo.online ? "Yes" : "No"}</Typography>
          <img src={photo.photo} alt={`Photo ${key}`} />
        </Box>
      )))}
    </Box>
  );
};

export default Camera;
