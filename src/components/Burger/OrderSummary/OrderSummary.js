import React, { Component } from "react";

import Aux from "../../../hoc/Aux/Aux";

import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredient) => (
        <li key={ingredient}>
          <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
          {this.props.ingredients[ingredient]}
        </li>
      )
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious order with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Current Price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
