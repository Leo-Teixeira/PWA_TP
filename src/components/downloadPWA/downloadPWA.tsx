"use client"

import {useState, useEffect} from "react"
import {Button} from "@mui/material"
import { Box } from "@mui/system"
import DownloadingIcon from "@mui/icons-material/Downloading";

export default function DownloadPwa() {
    const [installable, setInstallable] = useState(false)
    const [installPrompt, setInstallPrompt] = useState<any>(null)

    useEffect(() => {
        const isBrowser = typeof window !== "undefined" && window
        if (isBrowser) {
            const handleBeforeInstallPrompt = (event : any) => {
                // Gérer l'événement beforeinstallprompt ici
                console.log('L\'événement beforeinstallprompt a été déclenché !');
                //   event.preventDefault(); // Empêche le navigateur d'afficher la fenêtre d'installation par défaut
                setInstallPrompt(event)
                setInstallable(true)
            };
        
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        
            return () => {
              window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            };
        }
        
      }, []);

    const install = () => {
        if (installPrompt) {
            installPrompt.prompt()
            installPrompt.userChoice.then((choiceResult : any) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt")
                    setInstallable(false)
                } else {
                    console.log("User dismissed the install prompt")
                }
            })
        }
    }

	return (
		<Box className="">
            <Button variant="contained" startIcon={<DownloadingIcon />} onClick={install} disabled={!installable}>
                Installer l'application
            </Button>
		</Box>
	)
}