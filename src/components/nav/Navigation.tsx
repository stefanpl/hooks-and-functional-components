import {
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { ReactElement, useMemo } from "react";
import { TCAppRoutes } from "../../routes/routeInterfaces";
import routes from "../../routes/routes";
import useNavigate from "../../routes/useNavigate";

export const drawerWidth = 240;

const useNavigationStyles = makeStyles((theme: Theme) =>
  createStyles({
    navItem: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: {},
  })
);

const Navigation: React.FunctionComponent = () => {
  const classes = useNavigationStyles();
  const navigate = useNavigate();

  const navItems = useMemo(
    () =>
      Object.entries(routes).map(
        ([route, data]): ReactElement => (
          <ListItem
            className={classes.navItem}
            onClick={() => navigate(route as TCAppRoutes)}
            button
            key={route}
          >
            {data.name}
          </ListItem>
        )
      ),
    [classes.navItem, navigate]
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>{navItems}</List>
    </Drawer>
  );
};

export default Navigation;
