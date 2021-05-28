import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/auth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import { Redirect } from "react-router";
import { updateObject, checkFormValidity } from "../../shared/helpers";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      shouldValidate: true,
      pristine: false,
      valid: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      shouldValidate: true,
      pristine: false,
      valid: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const { building, authRedirectPath, setAuthRedirectPath } = props;

  useEffect(() => {
    if (!building && authRedirectPath !== "/") setAuthRedirectPath();
  }, [building, authRedirectPath, setAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkFormValidity(
          event.target.value,
          controls[controlName].validation
        ),
        pristine: true,
      },
    });

    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const formElements = Object.keys(controls).map((formKey) => ({
    id: formKey,
    config: controls[formKey],
  }));

  let form = formElements.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      shouldValidate={formElement.config.shouldValidate}
      dirty={formElement.config.pristine}
      valid={formElement.config.valid}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loadiing) {
    form = <Spinner />;
  }

  return (
    <div className={classes.Auth}>
      {props.isAuth && <Redirect to={props.redirectPath} />}

      {props.error && props.error.message}

      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>

      <Button btnType="Danger" clicked={switchAuthMode}>
        SWITCH TO {isSignUp ? "SIGNIN" : "SIGN UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loadiing: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  building: state.burger.building,
  redirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(actionCreators.auth(email, password, isSignUp)),
  setAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirect("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
