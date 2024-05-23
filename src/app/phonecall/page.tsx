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
            {/* <Grid container spacing={1}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                    <Grid item xs={4} key={key}>
                        {
                            key === '<' ? 
                            <Button variant="outlined" sx={{ borderRadius: 32 }} onClick={() => handleClick(key)} fullWidth>
                                {key}
                            </Button> : 
                            <Button variant="outlined" sx={{ borderRadius: 32 }} onClick={() => handleClick(key)} fullWidth>
                                {key}
                            </Button>
                        }
                        
                    </Grid>
                ))}
            </Grid> */}
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
