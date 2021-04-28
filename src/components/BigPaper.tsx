import { createStyles, makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useBigPaperStyles = makeStyles((theme) =>
  createStyles({
    bigPaper: {
      margin: theme.spacing(10, 0),
      padding: theme.spacing(5),
    },
  })
);

const BigPaper: React.FunctionComponent = (props) => {
  const classes = useBigPaperStyles();

  return (
    <Paper elevation={10} className={classes.bigPaper}>
      {props.children}
    </Paper>
  );
};

export default BigPaper;
