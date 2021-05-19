import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actionCreators from "../../redux/actions/index";

class Orders extends Component {
  async componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          this.props.orders.length !== 0 &&
          this.props.orders.map((order, id) => (
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

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(actionCreators.fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
