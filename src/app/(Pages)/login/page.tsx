"use client";
import { LoginData } from "@/Interfaces/loginData";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserIsLoggedIn } from "@/Redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .matches(
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Enter a valid email."
      ),
    password: Yup.string().required("Password is required."),
  });

  const initialValues: LoginData = {
    email: "",
    password: "",
  };

  async function onSubmit(values: LoginData) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      setIsLoading(false);

      if (data.message === "success") {
        setToast({
          open: true,
          message: "Logged in successfully!",
          severity: "success",
        });

        Cookies.set("token", data.token);
        dispatch(setUserIsLoggedIn(true));
        router.push("/");
      } else {
        setToast({
          open: true,
          message: data?.message || "Login failed.",
          severity: "error",
        });
      }
    } catch (error: unknown) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setToast({
          open: true,
          message:
            error.response?.data?.message ||
            "Login failed. Please check your email and password.",
          severity: "error",
        });
      } else {
        setToast({
          open: true,
          message: "An unexpected error occurred.",
          severity: "error",
        });
      }
    }
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <Container sx={{ textAlign: "center", marginTop: 8 }}>
      <Typography variant="h3" component={"h1"}>
        Login Now
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ maxWidth: 650, mx: "auto" }}
      >
        <Stack spacing={3} marginTop={8}>
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            value={values.email}
            type="email"
            variant="outlined"
            fullWidth
            placeholder="Ex: Omarmansour@gmail.com"
          />
          <TextField
            label="Password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            value={values.password}
            type="password"
            variant="outlined"
            fullWidth
          />
          <Box>
            <Button
              variant="outlined"
              type="submit"
              sx={{ paddingInline: "70px" }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* Toast Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
