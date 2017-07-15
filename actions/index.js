export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';
const localForage = require('localforage');

export const signinAction = token => {
  console.log('TO', token);
  localForage.setItem('accessToken', token).then(console.log('TOKEN', token));
  return { type: AUTH_SIGNIN };
};

export const signoutAction = () => {
  localForage.removeItem('accessToken');
  return { type: AUTH_SIGNOUT };
};
