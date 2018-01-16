// @flow
import { isStringEmpty, isEmail } from '../../libraries/validations';

export default (values: { [string]: ?string }) => {
  const errorsBuffer = {};

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === 'string') {
      if (isStringEmpty(value)) {
        errorsBuffer[key] = 'Required';
        return;
      }

      if (key === 'email' && !isEmail(value)) {
        errorsBuffer[key] = 'Invalid email address';
        return;
      }

      if (
        key === 'password' &&
        values.password &&
        values.password.length <= 3
      ) {
        errorsBuffer[key] = 'Must be at least 4 characters';
      }
    } else {
      errorsBuffer[key] = 'Required';
    }
  });

  // can be false or object
  const errors = Object.keys(errorsBuffer).length > 0 ? errorsBuffer : false;

  return {
    errors,
    touched: true
  };
};
