import persist from '../../libraries/persist';

// Constants
export const AUTH_SIGNIN = 'AUTH/SIGNIN';
export const AUTH_SIGNOUT = 'AUTH/SIGNOUT';
export const AUTH_SERVERERROR = 'AUTH/SERVERERROR';

// Initial State
const initialState = {
  authenticated: false,
  token: null,
  error: null
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return {
        ...state,
        authenticated: true,
        token: action.token,
        error: null
      };
    case AUTH_SIGNOUT:
      return { ...state, authenticated: false, token: null, error: null };
    case AUTH_SERVERERROR:
      return { ...state, authenticated: false, error: action.error };
    default:
      return state;
  }
};

// Action creators
const actionCreators = {};

actionCreators.signIn = token => ({ type: AUTH_SIGNIN, token });
actionCreators.signOut = () => ({ type: AUTH_SIGNOUT });

// Discpatchers
const dispatchers = {};

dispatchers.signIn = token => {
  persist.willSetAccessToken(token);
  return actionCreators.signIn(token);
};

dispatchers.signOut = () => {
  persist.willRemoveAccessToken();
  return actionCreators.signOut();
};

export { actionCreators, reducer, dispatchers };
