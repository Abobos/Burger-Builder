import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/Navigationitems";

import classes from "./Toolbar.css";

const toolbar = () => {
  return (
    <div className={classes.Toolbar}>
      <div>Menu</div>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default toolbar;
