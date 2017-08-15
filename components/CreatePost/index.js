import React from 'react';
import PropTypes from 'prop-types';
import Filter from 'bad-words';
import { Form, SubmitButton } from './styles';
import { Router } from '../../routes';
import connect from './store';
import words from '../../libraries/badWords';

const filter = new Filter({ placeHolder: ' ' });
filter.addWords(words);

class CreateForm extends React.Component {
  static propTypes = {
    mutations: PropTypes.shape({
      createPost: PropTypes.func.isRequired
    }).isRequired
  };

  handleSubmit = e => {
    e.preventDefault();

    let title = e.target.elements.title.value;
    let url = e.target.elements.url.value;

    if (title && title !== '') {
      title = filter.clean(title).trim();
      e.target.elements.title.value = title;
    }
    if (url && url !== '') {
      url = filter.clean(url).trim();
      e.target.elements.url.value = url;
    }

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

  render = () =>
    <Form onSubmit={this.handleSubmit}>
      <h1>Add new post</h1>
      <input placeholder="title" name="title" />
      <input placeholder="url" name="url" />
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>;
}

export default connect(CreateForm);
