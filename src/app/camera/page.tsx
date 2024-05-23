"use client";
import { Button, ImageList, ImageListItem } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import OnlineStatus from "../../components/global/OnlineStatus";

const Camera = () => {
  const { isOnline } = OnlineStatus();
  const [camera, setCamera] = useState<boolean | null>(false);
  const [buttonText, setButtonText] = useState<string | null>("Allumer caméra");
  const [photos, setPhotos] = useState<
    Map<string, { photo: string; online: boolean | null }>
  >(new Map());
  const videoRef = useRef<any>();
  //   const notification = document.querySelector("#notification");
  //   const sendButton = document.querySelector("#send");

  useEffect(() => {
    localStorage.setItem("listPhoto", JSON.stringify(photos));
  }, [photos]);

    useEffect(() => {
      const handleOnlineAction = () => {
        // Actions à effectuer lorsque l'utilisateur est en ligne
        console.log("En ligne");
        setPhotos((prevPhotos) => {
          const updatedPhotos = new Map(prevPhotos);
          updatedPhotos.forEach((photo) => {
            photo.online = true;
            showNotification()
          });
          return updatedPhotos;
        });
      };

      const handleOfflineAction = () => {
        // Actions à effectuer lorsque l'utilisateur est hors ligne
        console.log("Hors ligne");
      };

      if (isOnline) {
        handleOnlineAction();
      }
      else {
        handleOfflineAction();
      }
    }, [isOnline]);

  const showNotification = async () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          new Notification("Notification", {
            body: "sah quel plaisir",
          });
        } else {
          throw new Error("Permission denied");
        }
      });
    } else {
      throw new Error("Notification not supported");
    }
  };

  const handleVibration = () => {
    navigator.vibrate([
      100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
    ])
  }

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
        audio: false,
        video: { width: 200, height: 200 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        videoRef.current.srcObject = null;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const takePhoto = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      if (
        canvas &&
        videoRef.current &&
        videoRef.current.videoWidth &&
        videoRef.current.videoHeight
      ) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

        const data = canvas.toDataURL("image/png");
        setPhotos((prevPhotos) => {
          const newPhotos = new Map(prevPhotos);
          newPhotos.set(`photo_${prevPhotos.size + 1}`, {
            photo: data,
            online: isOnline,
          });
          return newPhotos;
        });
      }
      if (isOnline) {
        showNotification();
        handleVibration();
      }
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
      {photos &&
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {Array.from(photos.entries()).map(([key, photo]) => (
                <ImageListItem key={key}>
                    <img
                    src={`${photo.photo}?w=164&h=164&fit=crop&auto=format`}
                    alt={`Photo ${key}`}
                    loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
        // Array.from(photos.entries()).map(([key, photo]) => (
        //   <Box key={key}>
        //     <Typography>Online: {photo.online ? "Yes" : "No"}</Typography>
        //     <img src={photo.photo} alt={`Photo ${key}`} />
        //   </Box>
        // ))
        }
    </Box>
  );
};

export default Camera;
