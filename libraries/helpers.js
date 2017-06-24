/* eslint-disable no-restricted-syntax */

export default () => {};

export function dump(obj) {
  let out = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      out += `${key}: ${obj[key]}\n`;
    }
  }

  return out;
}

/* eslint-enable no-restricted-syntax */
