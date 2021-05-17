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
import * as burgerBuilderActions from "../../redux/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    // try {
    //   const response = await axios.get("/ingredients.json");
    //   console.log({ response });
    //   this.setState({ ingredients: response.data });
    // } catch (err) {
    //   this.setState({ error: true });
    // }
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
    this.setState({ purchasing: !this.state.purchasing });
  };

  continuePurchase = () => {
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
          {this.state.loading ? (
            <Spinner />
          ) : this.props.ingredients ? (
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
            />
          </Aux>
        ) : this.state.error ? (
          <p>Ingreidents can't be loaded</p>
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  addIngredient: (ingredientName) =>
    dispatch(burgerBuilderActions.addIngredient(ingredientName)),
  removeIngredient: (ingredientName) =>
    dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
