// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, SubmitButton } from './styles';
import { Router } from '../../routes';
import connect from './store';

type Props = {
  mutations: {
    createPost: Function
  }
};

class CreateForm extends React.Component<Props, *> {
  static propTypes = {
    mutations: PropTypes.shape({
      createPost: PropTypes.func.isRequired
    }).isRequired
  };

  handleSubmit = e => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    let url = e.target.elements.url.value;

    if (title === '' || url === '') {
      // eslint-disable-next-line no-alert
      window.alert('Both fields are required.');
      return false;
    }

    // prepend http if missing from url
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = `http://${url}`;
    }

    this.props.mutations.createPost(title, url);

    // reset form
    e.target.elements.title.value = '';
    e.target.elements.url.value = '';

    Router.pushRoute('/');
  };

  render = () => (
    <Form onSubmit={this.handleSubmit}>
      <h1>Add new post</h1>
      <input placeholder="title" name="title" />
      <input placeholder="url" name="url" />
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
}

export default connect(CreateForm);
