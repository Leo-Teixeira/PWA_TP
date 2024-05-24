'use client'
import React, { useState } from 'react';
import { Grid, Paper, Button, TextField, Box, Typography } from '@mui/material';

const PhoneCall = () => {
    const [inputValue, setInputValue] = useState('');

    const handleClick = (value: string) => {
        setInputValue(prev => prev + value);
    };

    return (
        <Box sx={{ height: '450px', width: '300px', padding: '20px', margin: '20px' }}>
            <Typography component={'h2'}>Passer un appel</Typography>
            <TextField
                type='tel'
                fullWidth
                variant="outlined"
                margin="normal"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                // InputProps={{
                //     readOnly: true,
                // }}
            />
            <Button
                variant="contained" 
                color="primary" 
                fullWidth 
                href={`tel:${inputValue}`}
                disabled={!inputValue}
                style={{ marginTop: '20px' }}
            >
                Appeler
            </Button>
        </Box>
    );
};

export default PhoneCall;
