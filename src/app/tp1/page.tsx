"use client";

import { Typography, Stack } from "@mui/material";
import GeoLocalisation from "@/components/GeoLocalisation/GeoLocalisation";
import Camera from "@/components/camera/camera";
import IsOnline from "@/components/Buttons/IsOnline";
import DownloadPwa from "@/components/downloadPWA/downloadPWA";

const Tp1 = () => {
  return (
    <Stack spacing={4} direction="column">
      <IsOnline />
      <Camera />
      {/* <GeoLocalisation /> */}
      {/* <DownloadPwa /> */}
    </Stack>
  );
};

export default Tp1;
