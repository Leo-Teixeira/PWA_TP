'use client'
import { Box, Button, Typography } from "@mui/material";

const VibrationPage = () => {

  const handleVibration = () => {
    if (typeof navigator !== "undefined" &&
    navigator &&
    "vibration" in navigator) {
      navigator.vibrate(2000)
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleVibration}>Vibration téléphone</Button>
    </>
  );
};

export default VibrationPage;
