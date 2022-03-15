import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import axios from 'axios';

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return {...state,errorMessage:''};
    case 'signout':
      return {token:null,errorMessage:''}
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type:'clear_error_message'})
}

const signup = (dispatch) => async ({name,email,phone,password,userInfo},navigate) => {
    let profile = userInfo.file;
    let data = {"name": name, "email": email, "phone": phone, "password": password, "profile": userInfo};
    const formData = new FormData();
    formData.append('name',name)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('password',password)
    formData.append('profile',(profile));
    try {
      const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/signup',
          headers: { 
            'Content-Type': 'multipart/form-data', 
            'Accept': 'application/x-www-form-urlencoded', 
          },
          data : formData
        });
        await sessionStorage.setItem("token", response.data.token);
        await sessionStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({ type: "signin", payload: response.data.token });
        navigate('/home')
    } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const signin = (dispatch) => async ({ phone, password },navigate) => {
  let data = {"phone": phone, "password": password}
  try {
    const response = await trackerApi.post("/signin", data);
    await sessionStorage.setItem("token", response.data.token);
    await sessionStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({ type: "signin", payload: response.data.token });
    navigate('/home')
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const signout = (dispatch) => async () => {
    await sessionStorage.removeItem('token');
    dispatch({type: 'signout'});
};


export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage },
  { token: null, errorMessage: "" }
);
