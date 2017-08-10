import { isStringEmpty, isEmail } from '../../libraries/validations';

export default values => {
  const errorsBuffer = {};

  Object.entries(values).forEach(([key, value]) => {
    if (isStringEmpty(value)) {
      errorsBuffer[key] = 'Required';
      return;
    }

    if (key === 'email' && !isEmail(value)) {
      errorsBuffer[key] = 'Invalid email address';
      return;
    }

    if (key === 'password' && values.password.length <= 3) {
      errorsBuffer[key] = 'Must be at least 4 characters';
    }
  });

  // can be false or object
  const errors = Object.keys(errorsBuffer).length > 0 ? errorsBuffer : false;

  return {
    errors,
    touched: true
  };
};
