import { isStringEmpty, isEmail } from '../../libraries/validations';

export default values => {
  const errors = {};
  const touched = true;

  if (isStringEmpty(values.firstName)) {
    errors.firstName = 'Required';
  }

  if (isStringEmpty(values.lastName)) {
    errors.lastName = 'Required';
  }

  if (isStringEmpty(values.email)) {
    errors.email = 'Required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (isStringEmpty(values.password)) {
    errors.password = 'Required';
  } else if (values.password.length <= 3) {
    errors.password = 'Must be at least 4 characters';
  }

  return { errors, touched };
};
