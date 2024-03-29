"use client"
import {useState, useEffect} from "react"
import OnlineStatus from "@/components/global/OnlineStatus";
import { Alert, Box, Button } from "@mui/material";
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import "./IsOnligne.scss";
const IsOnligne = () => {
    const { isOnline, whenOnline, whenOffline } = OnlineStatus();

    // const handleOnlineAction = () => {
    //     // Actions à effectuer lorsque l'utilisateur est en ligne
    //     console.log('En ligne');
    // };

    // const handleOfflineAction = () => {
    //     // Actions à effectuer lorsque l'utilisateur est hors ligne
    //     console.log('Hors ligne');
    // };

    // whenOnline(handleOnlineAction);
    // whenOffline(handleOfflineAction);
    return (
        <Alert icon={isOnline ? <WifiIcon fontSize="inherit" /> : <WifiOffIcon fontSize="inherit" /> } severity={isOnline ? "success" : "error"}>
            {isOnline ? "En ligne" : "Hors ligne"}
        </Alert>
	);
};

export default IsOnligne;

