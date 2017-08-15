const cookies = require('js-cookie');

class persist {
  static get ACCESS_TOKEN_KEY() {
    return 'accessToken';
  }

  static async willGetAccessToken() {
    return cookies.get(persist.ACCESS_TOKEN_KEY);
  }

  static async willSetAccessToken(value) {
    return cookies.set(persist.ACCESS_TOKEN_KEY, value);
  }

  static async willRemoveAccessToken() {
    return cookies.remove(persist.ACCESS_TOKEN_KEY);
  }
}

module.exports = persist;
