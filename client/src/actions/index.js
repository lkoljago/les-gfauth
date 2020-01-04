import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_ERROR } from './types';

/*
    ActionCreators => create/return Actions({ }) => dispatched => middlewares => reducers
*/
export const signUp = data => {
    /*
      step 1: use the data and to make http request to BE and end to along [x]
      step 2: Take the BE's response (JWTToken!) [x]
      step 3: dispatch user just signed up (with JWTToken) [x]
      step 4: save JWTToken into clients localStorage [x]
    */
  return async dispatch => {
    try {
      console.log('[ActionCreator] SignUp is called!');
      
      const res = await axios.post('http://localhost:9000/users/signup', data);
      console.log('res ', res);

      console.log('[ActionCreator] SignUp dispatched an action');
      
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      })

      localStorage.setItem('JWT_TOKEN', res.data.token);
      
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use'
      })
      
    }  
  }
}