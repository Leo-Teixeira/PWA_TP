'use client'
import { Box, Button, Typography } from "@mui/material";

const VibrationPage = () => {

  const handleVibration = () => {
    if (typeof navigator !== "undefined" &&
    navigator &&
    "vibration" in navigator) {
      navigator.vibrate([
        100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
      ])
    }
  }

  return (
    <Box>
      <Button variant="contained" onClick={handleVibration}>Vibration téléphone</Button>
    </Box>
  );
};

export default VibrationPage;
