'use client'

import BatteryStatus from "@/components/battery/battery";
import { Stack, Typography } from "@mui/material";

const Tp2 = () => {
  return (
    <Stack spacing={4} direction="column">
      <BatteryStatus/>
    </Stack>
  )
};

export default Tp2;
