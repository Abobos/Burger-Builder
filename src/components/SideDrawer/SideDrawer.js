import React from "react";

import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/Navigationitems";
import Backdrop from "../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.css";

import Aux from "../../hoc/Aux/Aux";

const sideDrawer = (props) => {
  const attachedClasses = props.open
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];

  return (
    <Aux>
      <Backdrop show={props.open} remove={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
