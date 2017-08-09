import { graphql } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import createPostGql from './createPost.gql';
import { Router } from '../../routes';

let CreateForm = ({ createPost }) => {
  function handleSubmit(e) {
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

    createPost(title, url);

    // reset form
    e.target.elements.title.value = '';
    e.target.elements.url.value = '';

    Router.pushRoute('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new post</h1>
      <input placeholder="title" name="title" />
      <input placeholder="url" name="url" />
      <button type="submit">Submit</button>
    </form>
  );
};

CreateForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

CreateForm = styled(CreateForm)`
  border-bottom: 1px solid #ececec;
  padding-bottom: 20px;
  margin-bottom: 20px;

  > h1 {
    font-size: 20px;
  }

  > input {
    display: block;
    margin-bottom: 10px;
  }
`;

export default graphql(createPostGql, {
  props: ({ mutate }) => ({
    createPost: (title, url) =>
      mutate({
        variables: { title, url },
        updateQueries: {
          allPosts: (previousResult, { mutationResult }) => {
            const newPost = mutationResult.data.createPost;
            return Object.assign({}, previousResult, {
              // Append the new post
              allPosts: [newPost, ...previousResult.allPosts]
            });
          }
        }
      })
  })
})(CreateForm);
