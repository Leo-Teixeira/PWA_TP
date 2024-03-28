import { createTheme, responsiveFontSizes } from "@mui/material";
import tpColors from "./colors";
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
      main: tpColors.midnightGreen,
      dark: tpColors.midnightGreen,
      light: tpColors.midnightGreen,
    },
    secondary: {
      main: tpColors.jasper,
      dark: tpColors.jasper,
      light: tpColors.jasper,
    },
    tertiary: {
      main: tpColors.gray,
      dark: tpColors.gray,
      light: tpColors.gray,
    },
    quartiary: {
      main: tpColors.saffron,
      dark: tpColors.saffron,
      light: tpColors.saffron,
    },
    alertError: {
      main: tpColors.verdigris,
      dark: tpColors.verdigris,
      light: tpColors.verdigris,
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
