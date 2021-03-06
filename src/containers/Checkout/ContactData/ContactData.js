import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionCreators from "../../../redux/actions";
import { updateObject, checkFormValidity } from "../../../shared/helpers";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      shouldValidate: true,
      pristine: false,
      valid: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      shouldValidate: true,
      pristine: false,
      valid: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 5,
        isNumeric: true,
      },
      shouldValidate: true,
      pristine: false,
      valid: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      shouldValidate: true,
      pristine: false,
      valid: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
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
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      value: "fastest",
      valid: true,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const orderHandler = async (event) => {
    event.preventDefault();

    const formData = Object.keys(orderForm).reduce((prevValue, curValue) => {
      const currentValue = {};

      currentValue[curValue] = orderForm[curValue].value;
      prevValue = { ...prevValue, ...currentValue };

      return prevValue;
    }, {});

    const newOrder = {
      ingredients: { ...props.ingredients },
      price: +props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.orderBurger(newOrder, props.token);
  };

  const inputChangedHandler = (event, formElementKey) => {
    let orderFormElement = JSON.parse(JSON.stringify(orderForm));
    let formElementDetails = orderFormElement[formElementKey];

    formElementDetails = updateObject(formElementDetails, {
      value: event.target.value,
      valid: checkFormValidity(
        event.target.value,
        formElementDetails.validation
      ),
      pristine: true,
    });

    orderFormElement = updateObject(orderFormElement, {
      [formElementKey]: formElementDetails,
    });

    let formIsValid = true;

    for (let inputIdentifier in orderFormElement)
      formIsValid = orderFormElement[inputIdentifier].valid && formIsValid;

    setOrderForm(orderFormElement);
    setIsFormValid(formIsValid);
  };

  const formElements = Object.keys(orderForm).map((formKey) => ({
    id: formKey,
    config: orderForm[formKey],
  }));

  let form = (
    <form onSubmit={orderHandler}>
      {formElements.map((formElement) => (
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
      ))}

      <Button btnType="Success" disabled={!isFormValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.orderLoading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
  price: state.burger.totalPrice,
  orderLoading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  orderBurger: (orderData, token) =>
    dispatch(actionCreators.purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
