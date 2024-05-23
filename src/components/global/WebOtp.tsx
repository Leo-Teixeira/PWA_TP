'use client'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

const WebOTP = () => {
    const [otp, setOtp] = useState("");
    
    useEffect(() => {
        if ("OTPCredential" in window) {

            console.log("OTPCredential is good");
            
            const ac = new AbortController();
            const otpOption = {
                otp: { transport: ["sms"] },
                signal: ac.signal
            };
            // const form = input.closest('form');
            // if (form) {
            // form.addEventListener('submit', e => {
            //     ac.abort();
            // });
            // }
            setTimeout(() => {
                // abort after 10 minutes
                ac.abort();
            }, 10 * 60 * 1000);
            navigator.credentials.get(otpOption).then((otp :any) => {
                if (otp) {
                    setOtp(otp.code);
                }
            }).catch(err => {
                console.log(err);
                // alert(err);
            });
          } else {
            // alert('OTP ELSE')
            console.log('OTP is not supported');
          }
    }, []);
  
    return {
		otp
	}
};

export default WebOTP;