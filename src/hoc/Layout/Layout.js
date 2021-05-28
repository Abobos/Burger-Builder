import React, { useState } from "react";
import { useSelector } from "react-redux";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

import classes from "./Layout.css";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <Aux>
      <div>
        <Toolbar
          isAuth={isAuthenticated}
          showSideDrawer={sideDrawerClosedHandler}
        />
        <SideDrawer
          isAuth={isAuthenticated}
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
        />
      </div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
