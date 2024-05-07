"use client";

import { Typography, Stack } from "@mui/material";
import GeoLocalisation from "../../components/GeoLocalisation/GeoLocalisation";
import Camera from "../../components/camera/camera";
import DownloadPwa from "../../components/downloadPWA/downloadPWA";
import IsOnline from "../../components/Buttons/IsOnline";

const Tp1 = () => {
  return (
    <Stack spacing={4} direction="column">
      <Camera />
      {/* <GeoLocalisation /> */}
      <DownloadPwa />
    </Stack>
  );
};

export default Tp1;
