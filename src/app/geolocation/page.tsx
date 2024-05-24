'use client';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import dynamic from 'next/dynamic';

const MapElement = dynamic(() => import("../../components/MapElement/MapElement"), {
  ssr: false
});

export default function GeoLocalisation() {
  const [positions, setPositions] = useState({
    latitude: 48.86,
    longitude: 2.337,
  });
  const [message, setMessage] = useState("Localisation non récupérée");
  const [showMarker, enableMarker] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      setMessage("Localisation en cours...");
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setMessage("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position : GeolocationPosition) => {
    setPositions({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    enableMarker(true);
  };

  const showError = (error : GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setMessage("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setMessage("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setMessage("The request to get user location timed out."); 
        break;
      default:
        setMessage("An unknown error occurred.");
        break;
    }
    setPositions({ latitude: 0, longitude: 0 });
    enableMarker(false);
  };

  return (
    <Box className="GeoLocalisation">
      <Stack spacing={2} direction="column">
        <Box>
          <Button
            variant="contained"
            startIcon={<LocationSearchingIcon />}
            onClick={getLocation}
          >
            Localisation
          </Button>
        </Box>

        {showMarker ? (
          <>
            <p>Latitude: {positions.latitude}</p>
            <p>Longitude: {positions.longitude}</p>
          </>
        ) : (
          <p>{message}</p>
        )}
        <MapElement
          latitude={positions.latitude}
          longitude={positions.longitude}
          showMarker={showMarker}
        />
      </Stack>
    </Box>
  );
}
