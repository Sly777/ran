import React from 'react';
import PropTypes from 'prop-types';
import AuthFields from '../components/AuthFields';
import validate from '../libraries/auth/authValidation';
import createUserWrapper from '../libraries/auth/createUserWrapper';
import signinUserWrapper from '../libraries/auth/signinUserWrapper';

const formFields = {
  signupFields: [
    { key: 1, attr: { name: 'firstName', type: 'text', label: 'First Name' } },
    { key: 2, attr: { name: 'lastName', type: 'text', label: 'Last Name' } },
    { key: 3, attr: { name: 'email', type: 'email', label: 'Email' } },
    { key: 4, attr: { name: 'password', type: 'password', label: 'Password' } }
  ],
  signinFields: [
    { key: 1, attr: { name: 'email', type: 'email', label: 'Email' } },
    { key: 2, attr: { name: 'password', type: 'password', label: 'Password' } }
  ]
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      serverErrors: {},
      touched: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  getServerErrors(err) {
    if (err.graphQLErrors) {
      const obj = {};
      obj.message = err.graphQLErrors[0].message;
      this.setState({
        serverErrors: obj
      });
    }
  }

  handleTouch() {
    this.setState({ touched: true });
  }

  handleChange(e) {
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    const obj = {};
    obj[fieldName] = fieldValue;
    this.setState(obj);
  }

  handleSubmit(e, valuesPack) {
    e.preventDefault();
    const handleValidate = validate(valuesPack);
    if (handleValidate.touched) {
      this.setState({ touched: handleValidate.touched });
    }
    if (handleValidate.errors) {
      this.setState({ errors: handleValidate.errors });
    }
    if (this.props.selectFields === 'signupFields') {
      this.props
        .createUser(valuesPack)
        .then(response => {
          if (response.data) {
            this.props.signinDispatcher(response.data.signinUser.token);
          } else {
            this.setState({
              errors: response.data.createUser.errors
            });
          }
        })
        .catch(err => {
          this.getServerErrors(err);
        });
    }
    if (this.props.selectFields === 'signinFields') {
      this.props
        .signinUser(valuesPack)
        .then(response => {
          if (response.data) {
            this.props.signinUserDispatcher(response.data.signinUser.token);
          }
        })
        .catch(err => {
          this.getServerErrors(err);
        });
    }
  }

  render() {
    const { selectFields } = this.props;
    const fields = formFields[selectFields];
    // Packing all the necessary auth field states
    const valuesPack = {};
    fields.map(x => {
      const y = x.attr.name;
      valuesPack[y] = this.state[y];
      return valuesPack;
    });
    return (
      <div>
        <AuthFields
          handleSubmit={e => {
            this.handleSubmit(e, valuesPack);
          }}
          handleChange={this.handleChange}
          fields={fields}
          selectFields={selectFields}
          errors={this.state.errors}
          touched={this.state.touched}
          handleTouch={this.handleTouch}
        />
        <br />
        <div>
          {Object.keys(this.state.errors).length === 0 &&
            this.state.serverErrors.message}
        </div>
      </div>
    );
  }
}

const defaultFunction = function defFunc() {};

AuthForm.defaultProps = {
  createUser: defaultFunction,
  signinDispatcher: defaultFunction,
  signinUser: defaultFunction,
  signinUserDispatcher: defaultFunction
};

AuthForm.propTypes = {
  selectFields: PropTypes.string.isRequired,
  createUser: PropTypes.func,
  signinDispatcher: PropTypes.func,
  signinUser: PropTypes.func,
  signinUserDispatcher: PropTypes.func
};

exports.SignupContainer = createUserWrapper(AuthForm);
exports.SigninContainer = signinUserWrapper(AuthForm);
