import {useState} from "react"
import {Button} from "@mui/material"
import { Box } from "@mui/system"
import DownloadingIcon from '@mui/icons-material/Downloading';


export default function downloadPWA() {
	return (
		<Box className="GeoLocalisation">
            <Button variant="contained" startIcon={<DownloadingIcon />}>
                Installer l'application
            </Button>
		</Box>
	)
}
