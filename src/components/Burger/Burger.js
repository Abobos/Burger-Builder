import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => (
        <BurgerIngredient key={ingredient + i} type={ingredient} />
      ));
    })
    .reduce((preVal, curVal) => [...preVal, ...curVal], []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = "please start adding ingredients!";
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
