import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredientName) => ({
  type: actionTypes.ADD_INGREDIENTS,
  ingredientName,
});

export const removeIngredient = (ingredientName) => ({
  type: actionTypes.REMOVE_INGREDIENTS,
  ingredientName,
});
