import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '~/routes'
import * as S from './styles'

export default class CreateForm extends React.Component {
  static propTypes = {
    mutations: PropTypes.shape({
      createPost: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleSubmit = e => {
    e.preventDefault()

    const title = e.target.elements.title.value
    let url = e.target.elements.url.value

    if (title === '' || url === '') {
      // eslint-disable-next-line no-alert
      window.alert('Both fields are required.')
      return false
    }

    // prepend http if missing from url
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = `http://${url}`
    }

    this.props.mutations.createPost(title, url)

    // reset form
    e.target.elements.title.value = ''
    e.target.elements.url.value = ''

    Router.pushRoute('/')
  };

  render = () =>
    <S.Form onSubmit={this.handleSubmit}>
      <h1>Add new post</h1>
      <input placeholder="title" name="title" />
      <input placeholder="url" name="url" />
      <S.SubmitButton type="submit">Submit</S.SubmitButton>
    </S.Form>;
}
