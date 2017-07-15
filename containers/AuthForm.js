/* eslint-disable */
import React from 'react';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import persist from '../libraries/persist';
import AuthFields from '../components/AuthFields';
import { signinAction } from '../actions';
import createUserWrapper from '../libraries/mutations/createUserWrapper';
import signinUserWrapper from '../libraries/mutations/signinUserWrapper';
const renderErrors = errors => {
  return (
      <div className="alert alert-danger" role="alert">
        {errors &&
          errors.map(err =>
            <span key={shortid.generate()}>
              {err.message}
            </span>
          )}
      </div>
  )
}



const validate = values => {
  const errors = {};
  const touched = true;
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length <= 3) {
    errors.password = 'Must be at least 4 characters';
  }
  return {errors, touched};
};

const formFields = {
  signupFields: [
      {key: 1, attr: {name: 'firstName', type: 'text',     label: 'First Name'}},
      {key: 2, attr: {name: 'lastName',  type: 'text',     label: 'Last Name'}},
      {key: 3, attr: {name: 'email',     type: 'email',    label: 'Email'}},
      {key: 4, attr: {name: 'password',  type: 'password', label: 'Password'}}
  ],
  signinFields: [
      {key: 1, attr: {name: 'email',     type: 'email',    label: 'Email'}},
      {key: 2, attr: {name: 'password',  type: 'password', label: 'Password'}}
  ]
}

class AuthForm extends React.Component {
    constructor(props){
      super(props);
      let formValues;
      this.state = {
        errors: {},
        serverErrors: {},
        touched: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleTouch = this.handleTouch.bind(this)
    }

    handleChange(e){
      const fieldValue = e.target.value;
      const fieldName = e.target.name;
      let obj = {};
      obj[fieldName] = fieldValue;
      this.setState(obj);
    }

    handleTouch(){
      this.setState({touched: true})
    }

    handleSubmit(e, valuesPack) {
      e.preventDefault();
      const handleValidate = validate(valuesPack);
      if(handleValidate.touched) {
        this.setState({touched: handleValidate.touched})
      }
      if(handleValidate.errors) {
        this.setState({errors: handleValidate.errors})
      }
      if(this.props.selectFields === 'signupFields'){
        this.props.createUser(valuesPack)
        .then((response) => {
          // !response.data.signinUser.errors
          if (response.data) {
            this.props.signinDispatcher(response.data.signinUser.token);
          } else {
            this.setState({
              errors: response.data.createUser.errors
            });
          }
        })
        .catch((err) => {
          if(err.graphQLErrors){
            let obj = {};
            obj['message'] = err.graphQLErrors[0].message
            this.setState({
              serverErrors: obj
            })
          } else console.log(err)
        });
      }
      if(this.props.selectFields === 'signinFields'){
        this.props.signinUser(valuesPack)
          .then(response => {
            console.log('RES', response)
            if (response.data) {
              this.props.signinUserDispatcher(response.data.signinUser.token);
            }
          }).catch((err) => {
            if(err.graphQLErrors){
              let obj = {};
              obj['message'] = err.graphQLErrors[0].message
              this.setState({
                serverErrors: obj
              })
            } else console.log(err)
          });
      }
    }

    render(){
      const { selectFields } = this.props;
      const fields = formFields[selectFields];
      const valuesPack = {}
      const formValues = fields.map(x => {
        const y = x.attr.name;
        valuesPack[y] = this.state[y];
      })
      return (
          <div>
            {this.state.serverErrors &&
                <div>
                  {this.state.serverErrors.message}
                </div>}
            <AuthFields
              handleSubmit={(e)=> {this.handleSubmit(e, valuesPack)}}
              handleChange={this.handleChange}
              fields={fields}
              errors={this.state.errors}
              touched={this.state.touched}
              handleTouch={this.handleTouch}
            />
          <br />
          </div>
      );
    }
};

exports.SignupContainer = createUserWrapper(AuthForm);
exports.SigninContainer = signinUserWrapper(AuthForm);
