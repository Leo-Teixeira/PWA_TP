"use client";

import { Typography, Stack } from "@mui/material";
import GeoLocalisation from "@/components/GeoLocalisation/GeoLocalisation";
import Camera from "@/components/camera/camera";
import IsOnligne from "@/components/Buttons/IsOnligne";
import DownloadPwa from "@/components/downloadPWA/downloadPWA";

const Tp1 = () => {
  return (
    <Stack spacing={4} direction="column">
      <IsOnligne />
      <Camera />
      <GeoLocalisation />
      {/* <DownloadPwa /> */}
    </Stack>
  );
};

export default Tp1;
