import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredients = Object.keys(props.ingredients).map((ingredient) => (
    <span
      style={{
        textTransform: "capitalize",
        margin: "0 8px",
        border: "1px solid gray",
        padding: "5px",
      }}
      key={ingredient}
    >
      <span>{ingredient}</span>({props.ingredients[ingredient]})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>ingredients: {ingredients}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
