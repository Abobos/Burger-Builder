import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../axios-orders";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionCreators from "../../redux/actions";

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.burger.ingredients);
  const totalPrice = useSelector((state) => state.burger.totalPrice);
  const error = useSelector((state) => state.burger.error);
  const isAuth = useSelector((state) => state.auth.token !== null);

  const addIngredient = (ingredientName) =>
    dispatch(actionCreators.addIngredient(ingredientName));
  const removeIngredient = (ingredientName) =>
    dispatch(actionCreators.removeIngredient(ingredientName));

  const setIngredient = useCallback(
    () => dispatch(actionCreators.fetchIngredients()),
    [dispatch]
  );

  const startPurchase = () => dispatch(actionCreators.purchaseBurgerStart());
  const setAuthRedirectPath = (path) =>
    dispatch(actionCreators.setAuthRedirect(path));

  useEffect(() => {
    setIngredient();
  }, [setIngredient]);

  const updatePurchaseState = (updatedIngredients) => {
    const ingredients = { ...updatedIngredients };

    const sum = Object.keys(ingredients).reduce(
      (sum, ingredient) => sum + ingredients[ingredient],
      0
    );

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing((prevState) => !prevState);
    } else {
      setAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const continuePurchase = () => {
    startPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ingredients,
  };

  for (let ingredient in disabledInfo)
    disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;

  return (
    <Aux>
      <Modal show={purchasing} removeModal={purchaseHandler}>
        {ingredients ? (
          <OrderSummary
            ingredients={ingredients}
            cancel={purchaseHandler}
            continue={continuePurchase}
            totalPrice={totalPrice}
          />
        ) : null}
      </Modal>

      {ingredients ? (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={addIngredient}
            ingredientRemoved={removeIngredient}
            disabledProps={disabledInfo}
            totalPrice={totalPrice}
            purchaseable={!updatePurchaseState(ingredients)}
            ordered={purchaseHandler}
            isAuth={isAuth}
          />
        </Aux>
      ) : error ? (
        <p>Ingreidents can't be loaded</p>
      ) : (
        <Spinner />
      )}
    </Aux>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
