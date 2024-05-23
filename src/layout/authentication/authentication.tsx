'use client'
import React, { useState } from "react";
import AppNavigation from "@/layout/AppNavigation/AppNavigation";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import WebOTP from "../../components/global/WebOtp";
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from "next/navigation";

const Authentication = () => {
    const [username, setUsername] = useState('');
    const { otp } = WebOTP();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.trim() !== '' && typeof localStorage !== 'undefined') {
            const id = generateUserId();
            localStorage.setItem("userName", username); // Utiliser un nom de clé cohérent
            localStorage.setItem("userId", id);
            router.push("/camera");
        }
    };

    const generateUserId = () => {
        return `user-${Math.random().toString(36).substr(2, 9)}`;
    };

    if (username) {
        return <AppNavigation/>
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, gap: '1rem' }}
            >
                <Typography variant="h4" component="h1" textAlign="center">
                    Connexion Plac
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />                    
                <Stack width={'100%'} direction="row" spacing={2}>
                    <TextField
                        type="tel"
                        label="Téléphone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" endIcon={<SendIcon />}>Envoyer</Button>
                </Stack>
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
                />
                <Button type="submit" variant="contained" color="primary">
                    Se connecter
                </Button>
            </Box>
        </Container>
    );
};

export default Authentication;
