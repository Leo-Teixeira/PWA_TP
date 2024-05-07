'use client'

import React from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import GroupIcon from "@mui/icons-material/Group"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import LanguageIcon from "@mui/icons-material/Language"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CollectionsIcon from '@mui/icons-material/Collections';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import VibrationIcon from '@mui/icons-material/Vibration';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ChatIcon from '@mui/icons-material/Chat';
import "./AppNavigation.scss"
import {useRouter} from "next/navigation"
import {PageNamesConstants} from "../../core/constant/page-name-constant"
import { Typography } from "@mui/material"

export default function AppNavigation() {
	const router = useRouter()
	const [value, setValue] = React.useState(0)
	// Au clique d'un bouton de la bottom navigation, on change la valeur de la bottom navigation
    // Si la taille de l'écran est inférieure à 600px, on return la bottom navigation
    // sinon on return la aside navigation
    return (
        <header className="AppNavigation">
            <Typography className="logo" variant="h5" component="h1">
            Logo Plac
            </Typography>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    router.push(newValue)
                }}>
                <BottomNavigationAction label="Caméra" icon={<PhotoCameraIcon />} value={PageNamesConstants.Camera.path} />
                <BottomNavigationAction label="Battery" icon={<BatteryStdIcon />} value={PageNamesConstants.Battery.path} />
                <BottomNavigationAction label="Localisation" icon={<LocationOnIcon />} value={PageNamesConstants.Localisation.path} />
                <BottomNavigationAction label="Galerie" icon={<CollectionsIcon />} value={PageNamesConstants.Gallery.path} />
                <BottomNavigationAction label="Mode vibreur" icon={<VibrationIcon />} value={PageNamesConstants.Vibration.path} />
                <BottomNavigationAction label="Appel téléphonique" icon={<PhoneInTalkIcon />} value={PageNamesConstants.PhoneCall.path} />
                <BottomNavigationAction label="WebOTP" icon={<LanguageIcon />} value={PageNamesConstants.WebOTP.path} />
                <BottomNavigationAction label="Tchat" icon={<ChatIcon />} value={PageNamesConstants.Tchat.path} />
            </BottomNavigation>
        </header>
    )
	
}
