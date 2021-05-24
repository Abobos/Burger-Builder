import authReducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });
  it("should store user's token upon login", () => {
    expect(
      authReducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        authData: {
          idToken: "some-token",
          localId: "some-userId",
        },
      })
    ).toEqual({
      token: "some-token",
      userId: "some-userId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
