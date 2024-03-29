'use client'

import {Typography, Stack} from "@mui/material"
import GeoLocalisation from "@/components/GeoLocalisation/GeoLocalisation"
import DownloadPwa from "@/components/downloadPWA/downloadPwa";

const Tp1 = () => {
    return <Stack spacing={4} direction="column">
        <Typography>Test tp1</Typography>
        <GeoLocalisation/>
        <DownloadPwa />
    </Stack>;
}

export default Tp1
