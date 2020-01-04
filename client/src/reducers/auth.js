import { AUTH_SIGN_UP, AUTH_ERROR } from '../actions/types';

const DEFAULT_STATE = {
  isAuthontificated: false,
  token: '',
  errorMessage: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] got an AUTH_SIGN_UP in action');
      return { ...state, token: action.payload, isAuthontificated: true, errorMessage: '' }
    case AUTH_ERROR:
      console.log('[AuthReducer] got an AUTH_ERROR in action');
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
  return state;
}