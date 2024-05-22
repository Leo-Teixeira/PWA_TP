import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

const WebOTP: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');

  useEffect(() => {
    const fetchOTP = async () => {
      if ('OTPCredential' in window) {
        const ac = new AbortController();
        const otpOption = {
          otp: { transport: ['sms'] },
          signal: ac.signal,
        };

        try {
          const otpCredential = await navigator.credentials.get(otpOption) as any;
          if (otpCredential && otpCredential.code) {
            console.log('OTP read:', otpCredential.code);
            setOtp(otpCredential.code);
          } else {
            setOtpError('No OTP code found in the credential');
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`OTP Submitted: ${otp}`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2em' }}>
      <Box
        style={{
          border: '1px solid',
          padding: '10px',
          margin: '10px 0',
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ autoComplete: 'one-time-code', inputMode: 'numeric' }}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit OTP
          </Button>
        </form>
        {otpError && (
          <Typography color="error" style={{ marginTop: '1em' }}>
            {otpError}
          </Typography>
        )}
        {!otpError && otp && (
          <Typography style={{ marginTop: '1em' }}>
            My OTP code is: {otp}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default WebOTP;
