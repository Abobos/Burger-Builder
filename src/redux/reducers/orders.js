import { updateObject } from "../../shared/helpers";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.id,
  };

  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {
    purchased: false,
    ...(action.isLoading && { loading: true }),
  });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      return purchaseBurgerSuccess(state, action);
    }

    case actionTypes.PURCHASE_BURGER_START: {
      return purchaseBurgerStart(state, action);
    }

    case actionTypes.PURCHASE_BURGER_FAILED: {
      return updateObject(state, { loading: false });
    }

    case actionTypes.FETCH_ORDERS_START: {
      return updateObject(state, { loading: true });
    }

    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return updateObject(state, { orders: action.orders, loading: false });
    }

    case actionTypes.FETCH_ORDERS_FAILED: {
      return updateObject(state, { error: action.error, loading: false });
    }

    default:
      return state;
  }
};

export default orderReducer;
