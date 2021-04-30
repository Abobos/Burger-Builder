import axios from '../../axios-orders';
import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.9,
  cheese: 0.2,
  meat: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/ingredients');
      console.log({ response });
      this.setState({ ingredients: response.data });
    } catch (err) {
      console.log({ err });
    }
  }

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
    this.setState({ purchasing: true });
  };

  continuePurchase = async () => {
    this.setState({ loading: true });

    // try {
    const newOrder = {
      ingredients: { ...this.state.ingredients },
      price: this.state.totalPrice,
      customer: {
        name: 'Blessing Makaraba',
        address: {
          street: '10 Ojodu Berger',
          zipCode: '+234',
          country: 'Nigeia',
        },
        email: 'blessingmakaraba@gmail.com',
      },

      deliveryMethod: 'fastest',
    };

    const response = await axios.post('/orders.json', newOrder);

    console.log({ response });

    this.setState({ loading: false, purchasing: false });

    // } catch (err) {
    //  this.setState({ loading: false, purchasing: false });

    // console.log({ err });
    // }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let ingredient in disabledInfo)
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;

    console.log(this.state);
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          loading={this.state.loading}
          removeModal={this.purchaseHandler}
        >
          {this.state.loading ? (
            <Spinner />
          ) : this.state.ingredients ? (
            <OrderSummary
              ingredients={this.state.ingredients}
              cancel={this.purchaseHandler}
              continue={this.continuePurchase}
              totalPrice={this.state.totalPrice}
              loading={this.state.loading}
            />
          ) : null}
        </Modal>

        {this.state.ingredients ? (
          <Aux>
            (<Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredient}
              ingredientRemoved={this.removeIngredient}
              disabledProps={disabledInfo}
              totalPrice={this.state.totalPrice}
              purchaseable={!this.state.purchaseable}
              ordered={this.purchaseHandler}
            />
          </Aux>
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
