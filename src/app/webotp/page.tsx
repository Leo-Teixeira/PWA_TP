'use client'

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type CredentialRequestOptions = {
    otp: OTPOptions
    signal: AbortSignal
}

type OTPOptions = {
    transport: string[]
}

const WebOTP = () => {
    const [otp, setOtp] = useState('');
    useEffect(() => {
        if ("OTPCredential" in window) {
        const ac = new AbortController();
        setTimeout(() => {
            ac.abort();
        }, 0.5 * 60 * 1000);
        const otpOption : CredentialRequestOptions = {
            otp: {transport: ['sms']},
            signal: ac.signal
        }
        navigator.credentials.get(otpOption).then((otp) => {
            setOtp(otp!.id);
            ac.abort();
          })
          .catch((err) => {
            ac.abort();
            console.log(err);
          });
        }
    }, [otp])

    return (<Box>
        <Typography>My OTP code is : {otp}</Typography>
    </Box>);
}

export default WebOTP;