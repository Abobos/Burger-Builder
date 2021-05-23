import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actionCreators from "../../redux/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
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
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (token, userId) =>
    dispatch(actionCreators.fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
