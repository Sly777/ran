// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Main, SubmitButton } from './styles';

type Props = {
  selectFields: string,
  fields: Array<{ key: number, attr: { [string]: string } }>,
  handleTouch: Function,
  handleChange: Function,
  handleSubmit: Function,
  touched: boolean,
  errors: ?{ [string]: string }
};

const AuthFields = (props: Props) => {
  const {
    selectFields,
    fields,
    handleTouch,
    handleChange,
    handleSubmit,
    touched,
    errors
  } = props;
  const mapFields = fields.map(field => (
    <div key={field.key}>
      <input
        name={field.attr.name}
        type={field.attr.type}
        placeholder={field.attr.label}
        onChange={handleChange}
        onFocus={handleTouch}
      />
      {errors && <div>{errors[field.attr.name]}</div>}
    </div>
  ));
  const authMethod =
    (selectFields === 'signinFields' && 'Sign In') || 'Sign Up';
  return (
    <Main>
      <h1>{authMethod}</h1>
      <form>
        {mapFields}
        <br />
        <SubmitButton
          onClick={handleSubmit}
          touched={touched}
          disabled={!touched}
        >
          {authMethod}
        </SubmitButton>
      </form>
    </Main>
  );
};

AuthFields.propTypes = {
  selectFields: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  handleTouch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthFields;
