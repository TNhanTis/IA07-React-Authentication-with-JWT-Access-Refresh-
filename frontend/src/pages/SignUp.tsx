import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useRegisterUser } from "../hooks/useRegisterUser";

interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignUpFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isLoading, isSuccess } = useRegisterUser();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const password = watch("password");

  const onSubmit = (data: SignUpFormInputs) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    setErrorMessage("");
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          setSuccessMessage(
            `Successfully registered! Welcome, ${response.user.email}`
          );
          reset();
          setTimeout(() => setSuccessMessage(""), 5000);
        },
        onError: (err: any) => {
          setErrorMessage(
            err?.response?.data?.message ||
              err?.message ||
              "Registration failed"
          );
        },
      }
    );
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Login here
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
