/* eslint-disable no-useless-escape */

export default () => {};

export function isStringEmpty(text) {
  return !text || text === '' || text.trim() === '';
}

export function isEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/* eslint-enable no-useless-escape */
