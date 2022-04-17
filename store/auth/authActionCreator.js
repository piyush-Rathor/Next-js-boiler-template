import { authActions } from "./authSlice";

export const postEmailSignUp = (values) => async (dispatch) => {
  //set Loadding is True
  try {
    dispatch(
      authActions.login({ email: values.email, isLogin: values.isLogin })
    );
    //setLodding is False
  } catch (error) {
    //catch the error
  }
};
