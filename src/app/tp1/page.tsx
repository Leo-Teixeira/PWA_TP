"use client";

import { Typography, Stack } from "@mui/material";
import GeoLocalisation from "@/components/GeoLocalisation/GeoLocalisation";
import DownloadPwa from "@/components/DownloadPwa/DownloadPwa";
import Camera from "@/components/camera/camera";

const Tp1 = () => {
  return (
    <Stack spacing={4} direction="column">
      <Camera />
      <GeoLocalisation />
      <DownloadPwa />
    </Stack>
  );
};

export default Tp1;
