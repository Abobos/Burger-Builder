import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actionCreators from "../../redux/actions";

const Orders = (props) => {
  const { token, userId, fetchOrders } = props;

  useEffect(() => {
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId]);

  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : (
        props.orders.length !== 0 &&
        props.orders.map((order, id) => (
          <Order
            key={id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))
      )}
    </>
  );
};

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
