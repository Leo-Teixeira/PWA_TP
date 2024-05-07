'use client'

import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CollectionsIcon from '@mui/icons-material/Collections';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import VibrationIcon from '@mui/icons-material/Vibration';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ChatIcon from '@mui/icons-material/Chat';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";
import { PageNamesConstants } from "../../core/constant/page-name-constant";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import "./AppNavigation.scss";

export default function AppNavigation() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState<string>(PageNamesConstants.Camera.path);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        router.push(newValue);
        if (isMobile) setDrawerOpen(false);
    };

    const navigationContent = (
        <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}>
            <BottomNavigationAction label="Caméra" icon={<PhotoCameraIcon />} value={PageNamesConstants.Camera.path} />
            <BottomNavigationAction label="Battery" icon={<BatteryStdIcon />} value={PageNamesConstants.Battery.path} />
            <BottomNavigationAction label="Localisation" icon={<LocationOnIcon />} value={PageNamesConstants.Localisation.path} />
            <BottomNavigationAction label="Galerie" icon={<CollectionsIcon />} value={PageNamesConstants.Gallery.path} />
            <BottomNavigationAction label="Mode vibreur" icon={<VibrationIcon />} value={PageNamesConstants.Vibration.path} />
            <BottomNavigationAction label="Appel téléphonique" icon={<PhoneInTalkIcon />} value={PageNamesConstants.PhoneCall.path} />
            <BottomNavigationAction label="WebOTP" icon={<LanguageIcon />} value={PageNamesConstants.WebOTP.path} />
            <BottomNavigationAction label="Tchat" icon={<ChatIcon />} value={PageNamesConstants.Tchat.path} />
        </BottomNavigation>
    );

    return (
        <header className="AppNavigation">
            <Typography className="logo" variant="h5" component="h1">
                Logo Place
            </Typography>
            {isMobile ? (
                <>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                    >
                        {navigationContent}
                    </Drawer>
                </>
            ) : navigationContent}
        </header>
    );
}
