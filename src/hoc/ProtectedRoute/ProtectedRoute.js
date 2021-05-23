import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ component: WrappedComponent, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) =>
        props.isAuthenticated ? (
          <WrappedComponent {...routeProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(ProtectedRoute);
