import { createTheme, responsiveFontSizes } from "@mui/material";
import epsColors from "./colors.scss";
import "typeface-ubuntu";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    alertError: Palette["primary"];
    alertSuccess: Palette["primary"];
    alertInfo: Palette["primary"];
    alertWarning: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    quartiary?: PaletteOptions["primary"];
    alertError?: PaletteOptions["primary"];
    alertSuccess?: PaletteOptions["primary"];
    alertInfo?: PaletteOptions["primary"];
    alertWarning?: PaletteOptions["primary"];
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
    alertSuccess: true;
    alertInfo: true;
    alertWarning: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
    bodySmallBold: true;
    bodySmallGreen: true;
    bodySmallGrey: true;
    bodyRegular: true;
    bodyRegularGreen: true;
    bodyRegularBold: true;
    bodyLarge: true;
    bodyLargeBold: true;
    heading3: true;
    subHeading: true;
    textSmallGrey: true;
  }
}

let EpsTheme = createTheme({
  palette: {
    primary: {
      main: epsColors.primaryGreen,
      dark: epsColors.primaryGreen,
      light: epsColors.secondaryGreenHover,
    },
    secondary: {
      main: epsColors.textGrey400,
      dark: epsColors.textGrey400,
      light: epsColors.textGrey300,
    },
    tertiary: {
      main: epsColors.textGrey400,
      dark: epsColors.textGrey400,
      light: epsColors.textGrey200,
    },
    quartiary: {
      main: epsColors.textWhite,
      dark: epsColors.textWhite,
      light: epsColors.textWhite,
    },
    alertError: {
      main: epsColors.alertError1,
      dark: epsColors.alertError1,
      light: epsColors.alertError2,
    },
    alertSuccess: {
      main: epsColors.alertSuccess1,
      dark: epsColors.alertSuccess1,
      light: epsColors.alertSuccess2,
    },
    alertInfo: {
      main: epsColors.alertInfo1,
      dark: epsColors.alertInfo1,
      light: epsColors.alertInfo2,
    },
    alertWarning: {
      main: epsColors.alertWarning1,
      dark: epsColors.alertWarning1,
      light: epsColors.alertWarning2,
    },
  },
});

EpsTheme = responsiveFontSizes(EpsTheme);
EpsTheme = createTheme(EpsTheme, {
  typography: {
    fontFamily: "Ubuntu, sans-serif",
    h1: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "40px !important",
      fontWeight: "bold",
      [EpsTheme.breakpoints.only("xs")]: {
        fontSize: "30px !important",
      },
    },
    h2: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "30px !important",
      fontWeight: "700",

      [EpsTheme.breakpoints.only("xs")]: {
        fontSize: "24px !important",
      },
    },
    h3: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "20px !important",
      fontWeight: "bold",
      textTransform: "initial",
      [EpsTheme.breakpoints.only("xs")]: {
        fontSize: "18px !important",
      },
    },
    h4: {
      fontFamily: "Ubuntu, sans-serif",
    },
    h5: {
      fontFamily: "Ubuntu, sans-serif",
    },
    h6: {
      fontFamily: "Ubuntu, sans-serif",
    },
    caption: {
      fontFamily: "Ubuntu, sans-serif",
    },
    bodyRegular: {
      fontFamily: "Ubuntu, sans-serif",
      fontWeight: "400",
      fontSize: "16px !important",
      lineHeight: "20px",
      letterSpacing: "0%",
      textTransform: "initial",
    },
    bodyLarge: {
      fontFamily: "Ubuntu, sans-serif",
      fontWeight: "400",
      fontSize: "18px !important",
      lineHeight: "24px",
      letterSpacing: "0%",
      textTransform: "initial",
    },
    bodyLargeBold: {
      fontFamily: "Ubuntu",
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "24px",
      letterSpacing: "0em",
      textAlign: "left",
    },
    bodyRegularGreen: {
      fontFamily: "Ubuntu, sans-serif",
      fontWeight: "400",
      fontSize: "16px !important",
      lineHeight: "20px",
      letterSpacing: "0%",
      textTransform: "initial",
      color: epsColors.primaryGreen,
    },
    bodyRegularBold: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "16px !important",
      fontWeight: "700",
      lineHeight: "20px",
      letterSpacing: "0%",
      textTransform: "initial",
    },
    bodySmall: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "14px !important",
      fontWeight: "400",
      lineHeight: "18px",
      letterSpacing: "0%",
      textTransform: "initial",
    },
    bodySmallBold: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "14px !important",
      fontWeight: "700",
      lineHeight: "18px",
      letterSpacing: "0%",
      textTransform: "initial",
    },
    bodySmallGreen: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "14px !important",
      fontWeight: "400",
      lineHeight: "18px",
      letterSpacing: "0%",
      textTransform: "initial",
      color: epsColors.primaryGreen,
    },
    bodySmallGrey: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "14px !important",
      fontWeight: "400",
      lineHeight: "20px",
      letterSpacing: "0%",
      textTransform: "initial",
      color: epsColors.textGrey300,
      textAlign: "center",
    },
    heading3: {
      fontFamily: "Ubuntu",
      fontSize: "20px",
      fontWeight: "700",
      lineHeight: "23px",
      letterSpacing: "0em",
      textAlign: "left",
    },
    subHeading: {
      fontFamily: "Ubuntu",
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "23px",
      letterSpacing: "0em",
      textAlign: "left",
    },
    textSmallGrey: {
      fontFamily: "Ubuntu, sans-serif",
      fontSize: "12px !important",
      fontWeight: "400",
      lineHeight: "20px",
      letterSpacing: "0%",
      textTransform: "initial",
      color: epsColors.textGrey300,
      textAlign: "center",
    },
  },
});

export default EpsTheme;
