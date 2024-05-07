"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CollectionsIcon from "@mui/icons-material/Collections";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import VibrationIcon from "@mui/icons-material/Vibration";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ChatIcon from "@mui/icons-material/Chat";
import { useRouter } from "next/navigation";
import { PageNamesConstants } from "../../core/constant/page-name-constant";
import "./AppNavigation.scss";

export default function AppNavigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(PageNamesConstants.Camera.path);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const navigationLinks = [
    {
      label: "Caméra",
      Icon: PhotoCameraIcon,
      path: PageNamesConstants.Camera.path,
    },
    {
      label: "Battery",
      Icon: BatteryStdIcon,
      path: PageNamesConstants.Battery.path,
    },
    {
      label: "Localisation",
      Icon: LocationOnIcon,
      path: PageNamesConstants.Localisation.path,
    },
    {
      label: "Galerie",
      Icon: CollectionsIcon,
      path: PageNamesConstants.Gallery.path,
    },
    {
      label: "Mode vibreur",
      Icon: VibrationIcon,
      path: PageNamesConstants.Vibration.path,
    },
    {
      label: "Appel téléphonique",
      Icon: PhoneInTalkIcon,
      path: PageNamesConstants.PhoneCall.path,
    },
    {
      label: "WebOTP",
      Icon: LanguageIcon,
      path: PageNamesConstants.WebOTP.path,
    },
    { label: "Tchat", Icon: ChatIcon, path: PageNamesConstants.Tchat.path },
  ];

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    setDrawerOpen(false);
    router.push(newValue);
  };

  const drawerContent = (
    <List>
      {navigationLinks.map(({ label, Icon, path }) => (
        <ListItem button key={label} onClick={() => router.push(path)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );

  const desktopNavigation = (
    <header className="AppNavigation">
      <Typography className="logo" variant="h5" component="h1">
        Logo Plac
      </Typography>
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Caméra"
          icon={<PhotoCameraIcon />}
          value={PageNamesConstants.Camera.path}
        />
        <BottomNavigationAction
          label="Battery"
          icon={<BatteryStdIcon />}
          value={PageNamesConstants.Battery.path}
        />
        <BottomNavigationAction
          label="Localisation"
          icon={<LocationOnIcon />}
          value={PageNamesConstants.Localisation.path}
        />
        <BottomNavigationAction
          label="Galerie"
          icon={<CollectionsIcon />}
          value={PageNamesConstants.Gallery.path}
        />
        <BottomNavigationAction
          label="Mode vibreur"
          icon={<VibrationIcon />}
          value={PageNamesConstants.Vibration.path}
        />
        <BottomNavigationAction
          label="Appel téléphonique"
          icon={<PhoneInTalkIcon />}
          value={PageNamesConstants.PhoneCall.path}
        />
        <BottomNavigationAction
          label="WebOTP"
          icon={<LanguageIcon />}
          value={PageNamesConstants.WebOTP.path}
        />
        <BottomNavigationAction
          label="Tchat"
          icon={<ChatIcon />}
          value={PageNamesConstants.Tchat.path}
        />
      </BottomNavigation>
    </header>
  );

  const mobileNavigation = (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo Place
        </Typography>
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );

  return <>{isMobile ? mobileNavigation : desktopNavigation}</>;
}
