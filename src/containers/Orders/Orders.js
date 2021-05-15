import React, { Component } from "react";
import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  async componentDidMount() {
    const response = await axios.get("orders.json");

    const fetchedOrders = [];

    for (let key in response?.data) {
      fetchedOrders.push({ ...response?.data[key], id: key });
    }

    this.setState({ loading: false });

    this.setState({ orders: fetchedOrders });
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <Spinner />
        ) : (
          this.state.orders.length !== 0 &&
          this.state.orders.map((order, id) => (
            <Order
              key={id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))
        )}
      </>
    );
  }
}

export default WithErrorHandler(Orders, axios);
