import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredientName) => ({
  type: actionTypes.ADD_INGREDIENTS,
  ingredientName,
});

export const removeIngredient = (ingredientName) => ({
  type: actionTypes.REMOVE_INGREDIENTS,
  ingredientName,
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const setError = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const fetchIngredients = () => async (dispatch) => {
  try {
    const response = await axios.get("/ingredients.json");
    dispatch(setIngredients(response.data));
  } catch (err) {
    dispatch(setError());
  }
};
