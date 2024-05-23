'use client'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

const WebOTP: React.FC = () => {
    const [otpcode, setOtpcode] = useState("");
    
    useEffect(() => {
        if ("OTPCredential" in window) {
            const ac = new AbortController();
            const otpOption = {
              otp: { transport: ['sms'] },
              signal: ac.signal,
            };
            const otpResult = navigator.credentials.get(otpOption).then((otp :any) => {
                console.log('OPT GET');
                alert('OPT GET');
                if (otp) {
                    setOtpcode(otp.code)
                }
            }).catch(err => {
                console.log(err);
                alert(err);
            });
          }
    });
  
    return (
      <>
        <h1>Web OTP example</h1>
        <h2>Your OTP is: {otpcode}</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otpcode}
        //   onChange={(e) => setOtpcode(e.target.value)}
        />
      </>
    );
};

export default WebOTP;