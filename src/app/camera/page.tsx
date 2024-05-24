"use client"
import {Button, ImageList, ImageListItem, ListItem, Stack} from "@mui/material"
import {Typography} from "@mui/material"
import {Box} from "@mui/system"
import {useState, useEffect, useRef} from "react"
import OnlineStatus from "../../components/global/OnlineStatus"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import CloudDoneIcon from "@mui/icons-material/CloudDone"
import CloudOffIcon from "@mui/icons-material/CloudOff"

interface interfacePhoto {
    photo: string;
    online: boolean | null;
}

const Camera = () => {
	const {isOnline} = OnlineStatus()
	const [camera, setCamera] = useState<boolean | null>(false)
	const [buttonText, setButtonText] = useState<string | null>("Allumer caméra")
	const [photos, setPhotos] = useState<Map<string, {photo: string; online: boolean | null}>>(new Map())
    const [listPhoto, setListPhoto] = useState<interfacePhoto[]>(typeof localStorage !== 'undefined' ? localStorage.getItem('listPhoto') ? JSON.parse(localStorage.getItem('listPhoto') ?? '') : []: []);
	const videoRef = useRef<any>()
	//   const notification = document.querySelector("#notification");
	//   const sendButton = document.querySelector("#send");

	// useEffect(() => {
    //     // setListPhoto(JSON.stringify(photos))
	// 	localStorage.setItem("listPhoto", listPhoto ? listPhoto : JSON.stringify(''))
    //     // setListPhoto( )
	// }, [photos])

    const newPhotos = new Map();
    let index = 0;
    listPhoto.forEach((photo: interfacePhoto) => {
        index++;
        newPhotos.set(`photo_${index}`, photo)
    })

    setPhotos(newPhotos)

	useEffect(() => {
		const handleOnlineAction = () => {
			// Actions à effectuer lorsque l'utilisateur est en ligne
			console.log("En ligne")
			setPhotos((prevPhotos) => {
				const updatedPhotos = new Map(prevPhotos)
                let nbPhotoUpdate = 0;
				updatedPhotos.forEach((photo) => {
                    if (photo.online == false) {
                        photo.online = true;
                        nbPhotoUpdate++;
                    }
				})
                if (nbPhotoUpdate > 1) {
                    showNotification(nbPhotoUpdate + 'ont été upload')
                }
				return updatedPhotos
			})
		}

		const handleOfflineAction = () => {
			// Actions à effectuer lorsque l'utilisateur est hors ligne
			console.log("Hors ligne")
		}

		if (isOnline) {
			handleOnlineAction()
		} else {
			handleOfflineAction()
		}
	}, [isOnline])

	const showNotification = async (textMessage = "Une nouvelle photo a été ajoutée") => {
		if ("Notification" in window) {
			Notification.requestPermission().then((result) => {
				if (result === "granted") {
					new Notification("Notification", {
						body: textMessage,
					})
				} else {
					throw new Error("Permission denied")
				}
			})
		} else {
			throw new Error("Notification not supported")
		}
	}

	const handleVibration = () => {
		navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100])
	}

	const startCamera = async () => {
		if (camera == false) {
			setCamera(true)
			setButtonText("Eteindre la caméra")
		} else {
			setCamera(false)
			setButtonText("Allumer caméra")
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {width: 200, height: 200},
			})
			if (videoRef.current) {
				videoRef.current.srcObject = stream
			} else {
				videoRef.current.srcObject = null
			}
		} catch (error) {
			console.error("Error accessing the camera:", error)
		}
	}

	const takePhoto = async () => {
		if (videoRef.current) {
			const canvas = document.createElement("canvas")
			if (canvas && videoRef.current && videoRef.current.videoWidth && videoRef.current.videoHeight) {
				canvas.width = videoRef.current.videoWidth
				canvas.height = videoRef.current.videoHeight
				canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0)

				const data = canvas.toDataURL("image/png")

				setPhotos((prevPhotos) => {
					const newPhotos = new Map(prevPhotos)
                    const newPhotoData: interfacePhoto = {
                        photo: data,
                        online: isOnline,
                    };
					newPhotos.set(`photo_${prevPhotos.size + 1}`, newPhotoData)
					return newPhotos
				})

                // On set dans le localStorage les photos*
                localStorage.setItem('listPhoto', JSON.stringify(photos))
			}
			if (isOnline) {
				showNotification("Une photo à été ajouté")
				handleVibration()
			}
		}
	}

	return (
		<Box>
			<Typography>Camera</Typography>
			{camera && (
				<Box>
					<video ref={videoRef} autoPlay />
					<Button id="take" onClick={takePhoto} endIcon={<AddPhotoAlternateIcon />}>
						Prendre une photo
					</Button>
				</Box>
			)}
			<Button onClick={startCamera} variant="contained" endIcon={<PhotoCameraIcon />}>
				{buttonText}
			</Button>
			{
				photos ? (
                    <Stack sx={{ marginTop:'2rem', gap:'1rem', flexWrap: 'wrap', flexDirection :'row' }}>
                        {Array.from(photos.entries()).map(([key, photo]) => (
                            <div key={key} className="img-container">
                                <img
                                src={photo.photo}
                                alt={`Photo ${key}`}
                                className="img"
                                loading="lazy"
                                width={200}
                                height={200}
                                />
                                <div className={photo.online ? 'img-icon' : 'img-icon'}>{photo.online ? <CloudDoneIcon fontSize="inherit" /> : <CloudOffIcon fontSize="inherit" />}</div>
                            </div>
                        ))}
                    </Stack>
				) : <div></div>
                // listPhoto &&
                //     <Stack sx={{ marginTop:'2rem', gap:'1rem', flexWrap: 'wrap', flexDirection :'row' }}>
                //         {listPhoto.map(([key, photo]) => (
                //             <div key={key} className="img-container">
                //                 <img
                //                 src={photo.photo}
                //                 alt={`Photo ${key}`}
                //                 className="img"
                //                 loading="lazy"
                //                 width={200}
                //                 height={200}
                //                 />
                //                 <div className={photo.online ? 'img-icon' : 'img-icon'}>{photo.online ? <CloudDoneIcon fontSize="inherit" /> : <CloudOffIcon fontSize="inherit" />}</div>
                //             </div>
                //         ))}
                //     </Stack>
				// Array.from(photos.entries()).map(([key, photo]) => (
				//   <Box key={key}>
				//     <Typography>Online: {photo.online ? "Yes" : "No"}</Typography>
				//     <img src={photo.photo} alt={`Photo ${key}`} />
				//   </Box>
				// ))
			}
		</Box>
	)
}

export default Camera
