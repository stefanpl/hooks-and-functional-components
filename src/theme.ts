import { red } from "@material-ui/core/colors";
import { createMuiTheme, Theme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0f1b9a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

const themeWithOverrides: Theme = {
  ...theme,
  overrides: {
    ...theme.overrides,
    MuiTypography: {
      h1: {
        color: theme.palette.primary.main,
        margin: "3rem 0 0 0",
      },
      subtitle1: {
        fontSize: "1.5rem",
        marginBottom: "2rem",
        marginTop: "1rem",
      },
      body1: {
        fontSize: "18px",
      },
      h2: {
        margin: theme.spacing(25, 0, 5),
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
  },
};

export default themeWithOverrides;
