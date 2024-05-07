'use client'
import { Box, Button, Typography } from "@mui/material";

const VibrationPage = () => {

  const handleVibration = () => {
    navigator.vibrate([
      100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
    ])
  }

  return (
    <div>
      <Button variant="contained" onClick={handleVibration}>Vibration téléphone</Button>
    </div>
  );
};

export default VibrationPage;
