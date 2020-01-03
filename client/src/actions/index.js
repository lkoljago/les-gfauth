import axios from 'axios';

/*
    ActionCreators => create/return Actions({ }) => dispatched => middlewares => reducers
*/
export const signUp = data => {
    /*
      step 1: use the data and to make http request to BE and end to along
      step 2: Take the BE's response (JWTToken!)
      step 3: dispatch user just signed up (with JWTToken)
      step 4: save JWTToken into clients localStorage
    */
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:9000/users/signup', data);
      console.log('res ', res);
      
    } catch(err) {
      console.log('err ', err);
      
    }  
  }
}