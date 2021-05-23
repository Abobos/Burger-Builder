import React from "react";
import Logo from "../../Logo/Logo";
import DrawerToggle from "../../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/Navigationitems";

import classes from "./Toolbar.css";

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle clicked={props.showSideDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </div>
  );
};

export default toolbar;
