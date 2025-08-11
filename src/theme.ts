"use client";
import { createTheme } from "@mui/material/styles";
const customColor = "rgb(149,93,186)";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "gray",
          },
          "& label.Mui-focused": {
            color: customColor,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: customColor,
            },
            "&:hover fieldset": {
              borderColor: customColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: customColor,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: customColor,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: customColor,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: customColor,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "gray",
          "&.Mui-focused": {
            color: "gray",
          },
        },
      },
    },
    MuiButton: {
  styleOverrides: {
    root: {
      color: "#ffffff", // white text
      backgroundColor: customColor, // purple background
      borderColor: customColor,
      paddingTop: 10,
      paddingBottom: 10,
      textTransform: "none", // Keep text as-is (no uppercase)
      fontWeight: 600,
      fontSize: "1rem",
      "&:hover": {
        backgroundColor: "#8a50b0", // slightly darker purple
        borderColor: "#8a50b6",
      },
    },
  },
},

  },
});

export default theme;
