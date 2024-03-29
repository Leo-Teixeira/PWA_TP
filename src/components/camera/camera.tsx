import { Button } from "@mui/material";
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
  const videoRef = useRef(null);

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

  const sendNotification = async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.ready;
    }

    if (Notification.permission === "granted") {
      await showNotification("sah");
    } else {
      if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          await showNotification("sah");
        }
      }
    }
  };

  const showNotification = async (title: string) => {
    if (!("Notification" in window)) {
      throw new Error("Notification not supported");
    }
    if (window.Notification.permission !== "granted") {
      throw new Error("Permission not granted for Notification");
    }
    return new window.Notification(title);
  };

  // const showNotification = async () => {
  //   const registration = await navigator.serviceWorker.getRegistration();
  //   const title = "What PWA Can Do Today";
  //   if ("showNotification" in registration) {
  //     window.showNotification(title);
  //   } else {
  //     new Notification(title);
  //   }
  // };

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

  const takePhoto = async () => {
    if (videoRef.current) {
      if (online) {
        await sendNotification();
      }
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
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
  };

  return (
    <Box>
      <Typography>Camera</Typography>
      {camera && (
        <Box>
          <video ref={videoRef} autoPlay />
          <Button id="take" onClick={takePhoto}>
            Prendre une photo
          </Button>
        </Box>
      )}
      <Button onClick={startCamera}>{buttonText}</Button>
      {Array.from(photos.entries()).map(([key, photo]) => (
        <Box key={key}>
          <Typography>Online: {photo.online ? "Yes" : "No"}</Typography>
          <img src={photo.photo} alt={`Photo ${key}`} />
        </Box>
      ))}
    </Box>
  );
};

export default Camera;
