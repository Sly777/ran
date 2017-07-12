import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      error &&
      <div>
        {error}
      </div>}
  </div>;

const renderErrors = errors =>
  <div className="alert alert-danger" role="alert">
    {errors &&
      errors.map(error =>
        <span key={error.id}>
          {error.value}
        </span>
      )}
  </div>;

let AuthForm = props => {
  const { handleSubmit } = props;
  const errors = props.errors <= 0 ? null : renderErrors(props.errors);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errors}
        <Field
          name="firstName"
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name="lastName"
          type="text"
          component={renderField}
          label="Last Name"
        />
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
    errors.id = 1;
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
    errors.id = 2;
  }

  if (!values.email) {
    errors.email = 'Required';
    errors.id = 3;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    errors.id = 4;
  }

  if (!values.password) {
    errors.password = 'Required';
    errors.id = 5;
  } else if (values.password.length <= 3) {
    errors.password = 'Must be at least 4 characters';
    errors.id = 6;
  }

  return errors;
};

renderField.defaultProps = {
  errors: []
};

AuthForm.defaultProps = {
  errors: []
};

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
};

AuthForm = styled(AuthForm)`
  border-bottom: 1px solid #ececec;
  padding-bottom: 20px;
  margin-bottom: 20px;

  > h1 {
    font-size: 20px;
  }

  >input {
    display: block;
    margin-bottom: 10px;
  }
`;

// Decorate the form component
export default reduxForm({
  form: 'AuthForm', // a unique name for this form
  validate
})(AuthForm);
