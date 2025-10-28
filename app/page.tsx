'use client';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 3,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Next.js 16 with MUI
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Your project has been reset to a clean slate with Material-UI installed and ready to use.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>
    </Container>
  );
}
