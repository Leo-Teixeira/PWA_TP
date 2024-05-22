'use client'

import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const WebOTP = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    const fetchOTP = async () => {
      if ('OTPCredential' in window) {
        const ac = new AbortController();
        const otpOption = {
          otp: { transport: ['sms'] },
          signal: ac.signal,
        };

        try {
          const otpCredential = await navigator.credentials.get(otpOption);
          if (otpCredential && 'code' in otpCredential) {
            const otpCode = (otpCredential as any).code;
            if (otpCode) {
              console.log('OTP read:', otpCode);
              setOtp(otpCode);
            } else {
              setOtpError('No OTP code found in the credential');
            }
          }
        } catch (err) {
          console.error('Failed to auto-read OTP:', err);
          setOtpError('Failed to auto-read OTP: ');
        }

        // Cleanup to abort the request if the component unmounts
        return () => {
          ac.abort();
        };
      } else {
        setOtpError('WebOTP API is not supported in this browser.');
      }
    };

    fetchOTP();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '2em' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <TextField
            label="Enter OTP"
            variant="outlined"
            value={otp}
            fullWidth
            margin="normal"
            inputProps={{ autoComplete: "one-time-code" }}
            required
          />
      </Box>
    </Container>
  );
};

export default WebOTP;
