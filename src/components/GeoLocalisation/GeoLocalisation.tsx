import {useState} from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import LocationSearchingIcon from "@mui/icons-material/LocationSearching"
import MapElement from "@/components/MapElement/MapElement"

export default function GeoLocalisation() {
	const [positions, setPositions] = useState({ latitude: 48.86, longitude: 2.337 })
    const [message, setMessage] = useState("Localisation non récupéré")
    const [showMarker, enableMarker] = useState(false)

	// Récupérer la position géographique de l'utilisateur
	// On demande l'autorisation à l'utilisateur
	// Si l'utilisateur accepte, on récupère sa position
	// Si l'utilisateur refuse, on affiche un message d'erreur
    // Si l'utilisateur ignore, on affiche un message d'erreur
    const getLocation = () => {
        if (navigator.geolocation) {
            setMessage("Localisation en cours...")
            navigator.geolocation.getCurrentPosition(showPosition, showError)
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    const showPosition = (position: any) => {
        // alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude)
        setPositions({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        enableMarker(true)
    }

    const showError = (error: any) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break
        }
        // Ajout d'une position vide
        setMessage("Localisation non récupérable")
        setPositions({ latitude: 0, longitude: 0 })
        enableMarker(false)
    }

	return (
		<Box className="GeoLocalisation">
			<Stack spacing={2} direction="column">
                <Box>
                    <Button variant="contained" startIcon={<LocationSearchingIcon />} onClick={getLocation}>
                        Localisation
                    </Button>
                </Box>
				
                {
                    showMarker === true ? (
                        <>
                            <p>Latitude: {positions.latitude}</p>
                            <p>Longitude: {positions.longitude}</p>
                        </>
                    ) : (
                        <p>{message}</p>
                    )
                }
                <MapElement latitude={positions.latitude} longitude={positions.longitude} showMarker={showMarker}/>
			</Stack>
		</Box>
	)
}
