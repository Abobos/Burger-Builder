import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/auth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import { Redirect } from "react-router";
import { updateObject, checkFormValidity } from "../../shared/helpers";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: true,
  };
  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/")
      this.props.setAuthRedirectPath();
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkFormValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        pristine: true,
      },
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthMode = () => {
    this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    const formElements = Object.keys(this.state.controls).map((formKey) => ({
      id: formKey,
      config: this.state.controls[formKey],
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
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loadiing) {
      form = <Spinner />;
    }

    return (
      <div className={classes.Auth}>
        {this.props.isAuth && <Redirect to={this.props.redirectPath} />}

        {this.props.error && this.props.error.message}

        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>

        <Button btnType="Danger" clicked={this.switchAuthMode}>
          SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

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
