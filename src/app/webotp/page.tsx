'use client'

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

type CredentialRequestOptions = {
    otp: OTPOptions
    signal: AbortSignal
}

type OTPOptions = {
    transport: string[]
}

const WebOTP = () => {
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
  
    useEffect(() => {
      if ('OTPCredential' in window) {
        const ac = new AbortController();
        const otpOption : CredentialRequestOptions = {
            otp: {transport: ['sms']},
            signal: ac.signal
        }
        navigator.credentials.get(otpOption).then((otpCredential) => {
          setOtp(otpCredential!.id);
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
  
    const handleOtpChange = (event : ChangeEvent<HTMLInputElement>) => {
      setOtp(event.target.value);
    };
  
    const handleSendNotification = () => {
      // Logique pour envoyer une notification pour WebOTP
      console.log('Notification sent for WebOTP with OTP:', otp);
    };
  
    return (
      <Container maxWidth="sm" style={{ marginTop: '2em' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            WebOTP Notification
          </Typography>
          <TextField
            label="Enter OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={handleOtpChange}
            margin="normal"
            error={!!otpError}
            helperText={otpError}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSendNotification}
            style={{ marginBottom: '1em' }}
          >
            Send Notification
          </Button>
          <Box>
            <Typography>My OTP code is: {otp}</Typography>
          </Box>
        </Box>
      </Container>
    );
}

export default WebOTP;