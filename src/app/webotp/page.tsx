'use client'

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type CredentialRequestOptions = {
  otp: OTPOptions;
  signal: AbortSignal;
};

type OTPOptions = {
  transport: string[];
};

const WebOTP = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    debugger;
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      const otpOption: CredentialRequestOptions = {
        otp: { transport: ['sms'] },
        signal: ac.signal,
      };
      navigator.credentials.get(otpOption).then((otpCredential) => {
        if (otpCredential) {
          console.log('OTP read:', otpCredential);
          // Use otpCredential.code to get the OTP value
          setOtp((otpCredential as any).code);
        }
      }).catch((err) => {
        setOtpError('Failed to auto-read OTP: ' + err.message);
      });

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
          {otpError ? (
            <Typography>{otpError}</Typography>
          ) : (
            <Typography>My OTP code is: {otp}</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default WebOTP;
