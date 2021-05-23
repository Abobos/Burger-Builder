import { connect } from "react-redux";

import axios from "../../axios-orders";
import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionCreators from "../../redux/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
  };

  componentDidMount() {
    this.props.setIngredient();
  }

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = { ...updatedIngredients };

    const sum = Object.keys(ingredients).reduce(
      (sum, ingredient) => sum + ingredients[ingredient],
      0
    );

    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.Auth) {
      this.setState({ purchasing: !this.state.purchasing });
    } else {
      this.props.setAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  continuePurchase = () => {
    this.props.startPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let ingredient in disabledInfo)
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          loading={this.state.loading}
          removeModal={this.purchaseHandler}
        >
          {this.props.ingredients ? (
            <OrderSummary
              ingredients={this.props.ingredients}
              cancel={this.purchaseHandler}
              continue={this.continuePurchase}
              totalPrice={this.props.totalPrice}
              loading={this.state.loading}
            />
          ) : null}
        </Modal>

        {this.props.ingredients ? (
          <Aux>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.addIngredient}
              ingredientRemoved={this.props.removeIngredient}
              disabledProps={disabledInfo}
              totalPrice={this.props.totalPrice}
              purchaseable={!this.updatePurchaseState(this.props.ingredients)}
              ordered={this.purchaseHandler}
              isAuth={this.props.isAuth}
            />
          </Aux>
        ) : this.props.error ? (
          <p>Ingreidents can't be loaded</p>
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  error: state.burger.error,
  isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  addIngredient: (ingredientName) =>
    dispatch(actionCreators.addIngredient(ingredientName)),
  removeIngredient: (ingredientName) =>
    dispatch(actionCreators.removeIngredient(ingredientName)),
  setIngredient: () => dispatch(actionCreators.fetchIngredients()),
  startPurchase: () => dispatch(actionCreators.purchaseBurgerStart()),
  setAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirect(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
