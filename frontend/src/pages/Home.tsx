import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Welcome to User Registration System
        </Typography>

        {isAuthenticated && (
          <Typography
            variant="h6"
            paragraph
            align="center"
            sx={{ mt: 2, color: "primary.main" }}
          >
            Hello, {user?.email}!
          </Typography>
        )}

        <Typography variant="h6" paragraph align="center" sx={{ mt: 4, mb: 4 }}>
          Secure JWT Authentication with Access & Refresh Tokens
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          {isAuthenticated ? (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </>
          )}
        </Box>

        <Typography variant="body1" paragraph sx={{ mt: 4 }}>
          This application provides a secure and user-friendly platform for user
          authentication using JWT tokens. Features include:
        </Typography>

        <Typography component="div" variant="body2">
          <ul>
            <li>JWT Access Tokens (15 minutes expiry) stored in memory</li>
            <li>JWT Refresh Tokens (7 days expiry) stored in localStorage</li>
            <li>Automatic token refresh on expiration</li>
            <li>Protected routes requiring authentication</li>
            <li>Secure password hashing with bcrypt</li>
            <li>Form validation with React Hook Form</li>
            <li>Responsive Material-UI design</li>
            <li>Real-time error feedback</li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
};
