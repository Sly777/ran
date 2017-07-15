/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AuthFields = props => {
  const { handleChange, handleSubmit, handleTouch, content, fields, touched, errors } = props;
  const mapFields = fields.map(field =>
    <div key={field.key}>
      <input
        name={field.attr.name}
        type={field.attr.type}
        placeholder={field.attr.label}
        onChange={handleChange}
        onFocus={handleTouch}
      />
    {errors &&
        <div>
          {errors[field.attr.name]}
        </div>}
    </div>
  );
  return (
    <div>
      <form>
        {mapFields}
        <br/>
        <button onClick={handleSubmit} className={!touched && "buttonDisabled"} disabled={!touched}>Submit</button>
      </form>
    </div>
  );
};

AuthFields.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  errors: PropTypes.object
};

export default styled(AuthFields)`
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
  >button {
      backgroundColor: red !important;
    }
`;

