import { AUTH_SIGNIN, AUTH_SIGNOUT } from '../../actions';

const initialState = {
  authenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return { ...state, authenticated: true };
    case AUTH_SIGNOUT:
      return { ...state, authenticated: false };
    default:
      return state;
  }
};
