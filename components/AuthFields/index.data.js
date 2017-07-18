import persist from '../../libraries/persist';

// Actions Naming
export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';
export const AUTH_SERVERERROR = 'AUTH_SERVERERROR';

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

// Actions
const actions = {};

actions.signIn = token => ({ type: AUTH_SIGNIN, token });
actions.signOut = () => ({ type: AUTH_SIGNOUT });

// Discpatchers
const dispatchers = {};

dispatchers.signIn = token => {
  persist.willSetAccessToken(token);
  return actions.signIn(token);
};

dispatchers.signOut = () => {
  persist.willRemoveAccessToken();
  return actions.signOut();
};

export { actions, reducer, dispatchers };
