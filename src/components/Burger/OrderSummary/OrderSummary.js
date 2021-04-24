import React from "react";

import Aux from "../../../hoc/Aux";

import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingredient) => (
    <li key={ingredient}>
      <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
      {props.ingredients[ingredient]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious order with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Current Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout</p>
      <Button btnType="Danger" clicked={props.cancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
