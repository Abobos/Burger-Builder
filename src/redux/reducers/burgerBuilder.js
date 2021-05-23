import { updateObject } from "../../shared/helpers";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.9,
  cheese: 0.2,
  meat: 0.9,
};

const addIngredientHelper = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredientHelper = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredientHelper = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    salad: action.ingredients.salad,
    bacon: action.ingredients.bacon,
    cheese: action.ingredients.cheese,
    meat: action.ingredients.meat,
  });

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: 4,
    error: false,
    building: false,
  };
  return updateObject(state, updatedState);
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS: {
      return addIngredientHelper(state, action);
    }

    case actionTypes.REMOVE_INGREDIENTS: {
      return removeIngredientHelper(state, action);
    }

    case actionTypes.SET_INGREDIENTS: {
      return setIngredientHelper(state, action);
    }

    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return updateObject(state, { error: true });
    }

    default:
      return state;
  }
};

export default burgerBuilderReducer;
