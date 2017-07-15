const localForage = require('localforage');

class persist {
  static get SESSION_TOKEN_KEY() {
    return 'sessionToken';
  }
  static get ACCESS_TOKEN_KEY() {
    return 'accessToken';
  }

  static async willGetSessionToken() {
    return localForage.getItem(persist.SESSION_TOKEN_KEY).catch(err => err);
  }

  static async willSetSessionToken(value) {
    return localForage
      .setItem(persist.SESSION_TOKEN_KEY, value)
      .catch(err => err);
  }

  static async willRemoveSessionToken() {
    return localForage.removeItem(persist.SESSION_TOKEN_KEY).catch(err => err);
  }

  static async willGetAccessToken() {
    return localForage.getItem(persist.ACCESS_TOKEN_KEY).catch(err => err);
  }

  static async willSetAccessToken(value) {
    console.log('willSetAccessToken', value);
    return localForage
      .setItem(persist.ACCESS_TOKEN_KEY, value)
      .catch(err => err);
  }

  static async willRemoveAccessToken() {
    return localForage.removeItem(persist.ACCESS_TOKEN_KEY).catch(err => err);
  }
}

module.exports = persist;
