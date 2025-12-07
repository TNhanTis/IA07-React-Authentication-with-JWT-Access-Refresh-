import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { userService } from "../services/api";

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card sx={{ mt: 3, mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              User Profile
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Email:</strong> {profile?.email || user?.email}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>User ID:</strong> {profile?.id || user?.id}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Account Created:</strong>{" "}
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString()
                  : user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          Welcome to your secure dashboard! This page is protected and can only
          be accessed with a valid JWT access token.
        </Typography>

        <Typography variant="body2" paragraph>
          Features implemented:
        </Typography>

        <Typography component="div" variant="body2">
          <ul>
            <li>JWT Access Token (15 minutes expiry) - stored in memory</li>
            <li>JWT Refresh Token (7 days expiry) - stored in localStorage</li>
            <li>Automatic token refresh on 401 errors</li>
            <li>Protected routes requiring authentication</li>
            <li>Secure logout clearing all tokens</li>
          </ul>
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
