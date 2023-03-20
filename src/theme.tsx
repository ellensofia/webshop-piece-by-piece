import {createTheme, Shadows, Theme} from "@mui/material";

export const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      "DM Sans",
      "avenir",
      "-apple-system",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 400,
      fontSize: "2.25rem",
      color: "#222222",
    },
    body1: {
      fontSize: "1rem",
      color: "#3C3C3C",
    },
  },
  palette: {
    primary: {
      main: "#3C3C3C",
    },
    secondary: {
      main: "#C7D8B7",
    },
    lightGrey: {
      main: "#F6F6F6",
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
  shadows: Array(25).fill("none") as Shadows,
});

declare module "@mui/material/styles" {
  interface Palette {
    lightGrey: Palette["primary"];
  }
  interface PaletteOptions {
    lightGrey?: PaletteOptions["primary"];
  }
}
