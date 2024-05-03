"use client"
import {useState, useEffect} from "react"
import OnlineStatus from "@/components/global/OnlineStatus";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import "./IsOnline.scss";
const IsOnline = () => {
    const { isOnline } = OnlineStatus();
    const [open, setOpen] = useState(false);
    
    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (isOnline) {
            setOpen(true);
        } else {
            setOpen(true);
        }
    }, [isOnline]);
    
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            onClose={handleClose}
            autoHideDuration={2000}
        >
            <Alert
                onClose={handleClose}
                icon={isOnline ? <WifiIcon fontSize="inherit" /> : <WifiOffIcon fontSize="inherit" /> }
                severity={isOnline ? "success" : "error"}
            >
                {isOnline ? "En ligne" : "Hors ligne" }
            </Alert>
        </Snackbar>
	);
};

export default IsOnline;

