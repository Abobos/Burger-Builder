import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.9,
  cheese: 0.2,
  meat: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = { ...updatedIngredients };

    const sum = Object.keys(ingredients).reduce(
      (sum, ingredient) => sum + ingredients[ingredient],
      0
    );

    this.setState({ purchaseable: sum > 0 });
  };

  addIngredient = (type) => {
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];

    this.setState(
      { ingredients: updatedIngredients, totalPrice: newPrice },
      this.updatePurchaseState(updatedIngredients)
    );
  };

  removeIngredient = (type) => {
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

    this.setState(
      { ingredients: updatedIngredients, totalPrice: newPrice },
      this.updatePurchaseState(updatedIngredients)
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  continuePurchase = () => {
    alert("you continue");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let ingredient in disabledInfo)
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;

    return (
      <Aux>
        <Modal show={this.state.purchasing} removeModal={this.purchaseHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.purchaseHandler}
            continue={this.continuePurchase}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredient}
          ingredientRemoved={this.removeIngredient}
          disabledProps={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchaseable={!this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
