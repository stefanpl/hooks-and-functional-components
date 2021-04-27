import { createStyles, makeStyles } from "@material-ui/core";
import React, { ReactElement } from "react";
import Navigation, { drawerWidth } from "../nav/Navigation";

interface PageLayoutProps {
  children: ReactElement;
}

export const usePageLayoutStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(2),
    },
    mainContent: {
      paddingLeft: drawerWidth,
    },
  })
);

const PageLayout: React.FunctionComponent<PageLayoutProps> = (
  props: PageLayoutProps
) => {
  const classes = usePageLayoutStyles();
  return (
    <>
      <div className={classes.wrapper}>
        <Navigation />
        <main className={classes.mainContent}>{props.children}</main>
      </div>
    </>
  );
};

export default PageLayout;
