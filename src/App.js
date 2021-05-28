import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";

import * as actionsCreators from "./redux/actions/index";

import ProtectedRoute from "./hoc/ProtectedRoute/ProtectedRoute";
import AsynComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "../src/hoc/Layout/Layout";

const AsyncCheckout = AsynComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const AsyncOrders = AsynComponent(() => {
  return import("./containers/Orders/Orders");
});

const AsyncAuth = AsynComponent(() => {
  return import("./containers/Auth/Auth");
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsCreators.authCheckState());
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <ProtectedRoute path="/checkout" component={AsyncCheckout} />
          <ProtectedRoute path="/orders" component={AsyncOrders} />
          <Route path="/auth" component={AsyncAuth} />
          <ProtectedRoute path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
