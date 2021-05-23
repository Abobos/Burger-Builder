import { updateObject } from "../../shared/helpers";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });

    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.authData.idToken,
        userId: action.authData.localId,
        error: null,
        loading: false,
      });

    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { userId: null, token: null });

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path });

    default:
      return state;
  }
};

export default authReducer;
