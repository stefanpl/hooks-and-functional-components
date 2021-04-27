import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useHomePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      color: theme.palette.primary.main,
    },
  })
);

const HomePage: React.FunctionComponent = () => {
  const classes = useHomePageStyles();

  return (
    <Typography variant="h1" className={classes.headline}>
      This is another page
    </Typography>
  );
};

export default HomePage;
