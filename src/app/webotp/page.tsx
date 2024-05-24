'use client'

import React from 'react';
import WebOTP from "../../components/global/WebOtp";
import { TextField } from '@mui/material';

const WebOTPPage: React.FC = () => {
    const { otp, setOtp } = WebOTP();
    // const [otp, setOtp] = useState("");

    return (
        <>
            <h2>Your OTP is: {otp}</h2>
            <TextField
                type="text"
                label="Code de validation"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="XXXXXX"
                autoComplete="one-time-code"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
        </>
    );
};

export default WebOTPPage;