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
        <header>
            <Box className="BottomNavigation">
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                        router.push(newValue)
                    }}>
                    <BottomNavigationAction label="TP 1" icon={<PhotoCameraIcon />} value={PageNamesConstants.Tp1.path} />
                    <BottomNavigationAction label="TP 2" icon={<LanguageIcon />} value={PageNamesConstants.Tp2.path} />
                    <BottomNavigationAction label="TP 3" icon={<GroupIcon />} value={PageNamesConstants.Tp3.path} />
                </BottomNavigation>
            </Box>
        </header>
	)
}
