"use client";
import { RegisterData } from "@/Interfaces/registerData";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { Snackbar, Alert } from "@mui/material";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const router = useRouter();
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 character.")
      .max(20, "Name cannot be bigger than 20 character.")
      .required("Name is required."),
    email: Yup.string()
      .required("Email is required.")
      .matches(
        /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/,
        "Enter a valid email."
      ),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      ),
    rePassword: Yup.string()
      .required("Confirmation password is required.")
      .oneOf([Yup.ref("password")], "Confirmation password does not match."),

    dateOfBirth: Yup.string().required("Date of birth is required."),
    gender: Yup.string().required("Gender is required."),
  });

  const initialValues: RegisterData = {
    name: "omar",
    email: "omar@gmail.com",
    password: "Qwqwqwqw1@",
    rePassword: "Qwqwqwqw1@",
    dateOfBirth: "11/11/2000",
    gender: "male",
  };

  async function onSubmit(values: RegisterData) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );

      setIsLoading(false);

      if (data.message === "success") {
        setToast({
          open: true,
          message: "Registered successfully!",
          severity: "success",
        });
        router.push("/login");
      } else {
        setToast({
          open: true,
          message: data.message || "Registration failed.",
          severity: "error",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setToast({
          open: true,
          message:
            error.response?.data?.error || "Registration failed. Try again.",
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
        Register Now
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ maxWidth: 650, mx: "auto" }}
      >
        <Stack spacing={2} marginTop={4}>
          <TextField
            label="Name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            value={values.name}
            type="text"
            variant="outlined"
            fullWidth
            placeholder="Ex: Omar Mansour"
          ></TextField>
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
          ></TextField>
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
          ></TextField>
          <TextField
            label="rePassword"
            name="rePassword"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rePassword && Boolean(errors.rePassword)}
            helperText={touched.rePassword && errors.rePassword}
            value={values.rePassword}
            type="password"
            variant="outlined"
            fullWidth
          ></TextField>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            fullWidth
            variant="outlined"
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
            helperText={touched.dateOfBirth && errors.dateOfBirth}
            sx={{
              mb: 2,
              "& input": {
                color: values.dateOfBirth ? "black" : "gray",
              },
              "& label": {
                color: "#953DBA",
              },
            }}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <FormControl
            fullWidth
            error={touched.gender && Boolean(errors.gender)}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            {touched.gender && errors.gender && (
              <Typography
                fontSize={13}
                color="error"
                textAlign={"left"}
                marginLeft={2}
              >
                {errors.gender}
              </Typography>
            )}
          </FormControl>
          <Box>
            <Button
              variant="outlined"
              type="submit"
              sx={{ paddingInline: "70px" }}
              loading={isLoading}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
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
