'use client'

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const WebOTP = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      const otpOption = {
        otp: { transport: ['sms'] },
        signal: ac.signal,
      };

      navigator.credentials.get(otpOption).then((otpCredential) => {
        if (otpCredential && 'code' in otpCredential) {
          const otpCode = (otpCredential as any).code;
          if (otpCode) {
            console.log('OTP read:', otpCode);
            setOtp(otpCode);
          } else {
            setOtpError('No OTP code found in the credential');
          }
        }
      }).catch((err) => {
        console.error('Failed to auto-read OTP:', err);
        setOtpError('Failed to auto-read OTP: ' + err.message);
      });

      // Cleanup to abort the request if the component unmounts
      return () => {
        ac.abort();
      };
    } else {
      setOtpError('WebOTP API is not supported in this browser.');
    }
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
        <Box>
          { otpError ? (
            <Typography color="error">{otpError}</Typography>
          ) : (
            <Typography>My OTP code is: {otp}</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default WebOTP;
