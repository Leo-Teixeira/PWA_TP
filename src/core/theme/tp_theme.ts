import { createTheme, responsiveFontSizes } from "@mui/material";
import TpColors from "./colors.scss";
import "typeface-ubuntu";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    alertError: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    quartiary?: PaletteOptions["primary"];
    alertError?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    quartiary: true;
  }
}
declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    alertError: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {}
}

let TpTheme = createTheme({
  palette: {
    primary: {
      main: TpColors.red,
      dark: TpColors.red,
      light: TpColors.red,
    },
    secondary: {
      main: TpColors.blue,
      dark: TpColors.blue,
      light: TpColors.blue,
    },
    tertiary: {
      main: TpColors.darkBlue,
      dark: TpColors.darkBlue,
      light: TpColors.darkBlue,
    },
    quartiary: {
      main: TpColors.darkGreen,
      dark: TpColors.darkGreen,
      light: TpColors.darkGreen,
    },
    alertError: {
      main: TpColors.yellow,
      dark: TpColors.yellow,
      light: TpColors.yellow,
    },
  },
});

TpTheme = responsiveFontSizes(TpTheme);
TpTheme = createTheme(TpTheme, {
  typography: {
    fontFamily: "Ubuntu, sans-serif",
  },
});

export default TpTheme;
