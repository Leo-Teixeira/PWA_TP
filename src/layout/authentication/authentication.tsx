'use client'
import React, { useState } from "react";
import AppNavigation from "@/layout/AppNavigation/AppNavigation";
import { Box, Button, TextField } from "@mui/material";

const Authentication = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(localStorage ? localStorage.getItem('userId') ? localStorage.getItem('userId') : '' : '');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.trim() !== '') {
            const id = generateUserId();
            setUserId(id);
            localStorage.setItem("userName", username);
            localStorage.setItem("userId", id);
        }
    };

    const generateUserId = () => {
        return `user-${Math.random().toString(36).substr(2, 9)}`;
    };

    if (userId) {
        return <AppNavigation />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}
        >
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Se connecter
            </Button>
        </Box>
    );
};

export default Authentication;
