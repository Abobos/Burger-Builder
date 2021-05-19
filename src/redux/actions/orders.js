import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const purchaseBurgerStart = (isLoading = false) => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    isLoading,
  };
};

export const purchaseBurger = (orderData) => async (dispatch) => {
  dispatch(purchaseBurgerStart(true));

  try {
    const response = await axios.post("/orders.json", orderData);

    dispatch(purchaseBurgerSuccess(response.data.name, orderData));
  } catch (err) {
    dispatch(purchaseBurgerFailed(err));
  }
};

export const fetchOrderSuccess = (orderData) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orderData,
  };
};

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await axios.get("orders.json");

    const fetchedOrders = [];

    for (let key in response?.data) {
      fetchedOrders.push({ ...response?.data[key], id: key });
    }

    dispatch(fetchOrderSuccess(fetchedOrders));
  } catch (err) {
    dispatch(fetchOrderFailed(err));
  }
};
