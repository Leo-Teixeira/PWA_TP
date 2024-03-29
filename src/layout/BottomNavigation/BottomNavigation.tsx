'use client'

import React from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import GroupIcon from "@mui/icons-material/Group"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import LanguageIcon from "@mui/icons-material/Language"
import "./BottomNavigation.scss"
import {useRouter} from "next/navigation"
import {PageNamesConstants} from "../../core/constant/page-name-constant"

export default function SimpleBottomNavigation() {
	const router = useRouter()
	const [value, setValue] = React.useState(0)

	// Au clique d'un bouton de la bottom navigation, on change la valeur de la bottom navigation

  return (
    <Box className="BottomNavigation">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}>
        <BottomNavigationAction
          label="TP 1"
          value="tp_1"
          icon={<PhotoCameraIcon />}
          component={Link}
          to={PageNamesConstants.Tp1.path}
        />
        <BottomNavigationAction
          label="TP 2"
          value="tp_2"
          icon={<LanguageIcon />}
          component={Link}
          to={PageNamesConstants.Tp2.path}
        />
        <BottomNavigationAction
          label="TP 3"
          value="tp_3"
          icon={<GroupIcon />}
          component={Link}
          to={PageNamesConstants.Tp3.path}
        />
      </BottomNavigation>
    </Box>
  );
}