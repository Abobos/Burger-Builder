import React, { Component } from "react";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
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
      },
    },
    isFormValid: false,
    loading: false,
  };

  checkFormValidity = (value, rules, trimmedValue = value.trim()) => {
    let isValid = false;

    if (rules.required) isValid = trimmedValue !== "";

    if (rules.minLength)
      isValid = trimmedValue.length >= rules.minLength && isValid;

    if (rules.maxLength)
      isValid = trimmedValue.length <= rules.maxLength && isValid;

    return isValid;
  };
  orderHandler = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = Object.keys(this.state.orderForm).reduce(
      (prevValue, curValue) => {
        const currentValue = {};

        currentValue[curValue] = this.state.orderForm[curValue].value;
        prevValue = { ...prevValue, ...currentValue };

        return prevValue;
      },
      {}
    );

    const newOrder = {
      ingredients: { ...this.props.ingredients },
      price: +this.props.price,
      orderData: formData,
    };

    await axios.post("/orders.json", newOrder);

    this.setState({ loading: false });

    this.props.history.push("/");
  };

  inputChangedHandler = (event, formElementKey) => {
    const orderFormElement = JSON.parse(JSON.stringify(this.state.orderForm));
    const formElementDetails = orderFormElement[formElementKey];

    formElementDetails.value = event.target.value;
    const isValid = this.checkFormValidity(
      formElementDetails.value,
      formElementDetails.validation
    );

    formElementDetails.valid = isValid;
    formElementDetails.pristine = true;

    const formELementsForValidation = Object.keys(orderFormElement);
    formELementsForValidation.pop();

    const isFormValid = formELementsForValidation.reduce((_, curValue) => {
      return orderFormElement[curValue].valid;
    }, false);

    this.setState({ orderForm: orderFormElement, isFormValid });
  };

  render() {
    const formElements = Object.keys(this.state.orderForm).map((formKey) => ({
      id: formKey,
      config: this.state.orderForm[formKey],
    }));

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map((formElement) => (
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
        ))}

        <Button btnType="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
  price: state.burger.totalPrice,
});

export default connect(mapStateToProps)(WithErrorHandler(ContactData, axios));
