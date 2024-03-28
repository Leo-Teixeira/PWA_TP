import { Button } from "@mui/base";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Camera = () => {
  async function getMedia() {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
    } catch (err) {
      /* handle the error */
    }
  }
  return (
    <Box>
      <Typography>Test</Typography>
      <Button onClick={getMedia}>Allumer caméra</Button>
    </Box>
  );
};

export default Camera;
