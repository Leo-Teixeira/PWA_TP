"use client";

import React, { useState, useEffect } from "react";
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
  Grid,
  Button,
  Stack,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ChatIcon from "@mui/icons-material/Chat";
import { useRouter } from "next/navigation";
import { PageNamesConstants } from "../../core/constant/page-name-constant";
import BatteryStatus from "@/app/battery/page";
import "./AppNavigation.scss";

export default function AppNavigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(PageNamesConstants.Camera.path);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storedUserName = localStorage.getItem("userName");
      setUserName(storedUserName ?? "");

        if (!localStorage.getItem("userId")) {
            router.push(PageNamesConstants.Login.path);
        }
    }
  }, []);

  const navigationLinks = [
    {
      label: "Caméra",
      Icon: PhotoCameraIcon,
      path: PageNamesConstants.Camera.path,
    },
    {
      label: "Localisation",
      Icon: LocationOnIcon,
      path: PageNamesConstants.Localisation.path,
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

  const disconnect = () => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        router.push(PageNamesConstants.Login.path);
        localStorage.clear();
        window.location.reload();
    }
  };

  const drawerContent = (
    <List sx={{height :  '100%', display : 'flex', flexDirection: 'column'}}>
        <ListItem sx={{ justifyContent : 'center' }}>
            <p style={{textAlign : 'center'}}> Bonjour {userName}</p>
        </ListItem>
      {navigationLinks.map(({ label, Icon, path }) => (
        <ListItem button key={label} onClick={() => router.push(path)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
        <ListItem sx={{ justifyContent : 'center', marginTop : 'auto' }}>
            <Button onClick={disconnect} sx={{ marginTop :'auto'}}>Déconnexion</Button>
        </ListItem>
        <ListItem sx={{ justifyContent : 'center' }}>
            <BatteryStatus />
        </ListItem>
    </List>
  );

  const desktopNavigation = (
    <header className="AppNavigation">
      <Stack>
        <Typography className="logo" variant="h5" component="h1" textAlign="center">
        PLAC
        </Typography>
      </Stack>
      {drawerContent}
      {/* <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ width: "100%" }}>
        <BottomNavigationAction
          label="Caméra"
          icon={<PhotoCameraIcon />}
          value={PageNamesConstants.Camera.path}
          sx={{ justifyContent: "flex-start" }}
        />
        <BottomNavigationAction
          label="Localisation"
          icon={<LocationOnIcon />}
          value={PageNamesConstants.Localisation.path}
          sx={{ justifyContent: "flex-start" }}
        />
        <BottomNavigationAction
          label="Appel téléphonique"
          icon={<PhoneInTalkIcon />}
          value={PageNamesConstants.PhoneCall.path}
          sx={{ justifyContent: "flex-start" }}
        />
        <BottomNavigationAction
          label="WebOTP"
          icon={<LanguageIcon />}
          value={PageNamesConstants.WebOTP.path}
          sx={{ justifyContent: "flex-start" }}
        />
        <BottomNavigationAction
          label="Tchat"
          icon={<ChatIcon />}
          value={PageNamesConstants.Tchat.path}
          sx={{ justifyContent: "flex-start" }}
        />
      </BottomNavigation> */}

        

    </header>
  );

  const mobileNavigation = (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Plac
        </Typography>
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );

  return <>{isMobile ? mobileNavigation : desktopNavigation}</>;
}
