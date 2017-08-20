import moment from 'moment'
import PropTypes from 'prop-types'
import { Section, A } from './styles'

const PostInfo = ({ loading, Post, error }) => {
  let title

  if (loading) {
    title = 'Loading...'
  } else if (error) {
    title = error.toString()
  } else if (!Post) {
    title = 'No such post'
  }

  if (title) {
    return (
      <Section>
        <h1>
          {title}
        </h1>
      </Section>
    )
  }

  return (
    <Section>
      <h1>
        {Post.title}
      </h1>
      <div>
        <span>
          ID: <b>{Post.id}</b>
        </span>
        <span>&nbsp;|&nbsp;</span>
        <span>
          Created At: {' '}
          <b>{moment(Post.createdAt).format('DD.MM.YYYY kk:mm')}</b>
        </span>
      </div>
      <p>
        <A target="_blank" href={Post.url} rel="noopener noreferrer nofollow">
          {Post.url}
        </A>
      </p>
    </Section>
  )
}

PostInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  Post: PropTypes.object,
  error: PropTypes.object
}

PostInfo.defaultProps = {
  Post: null,
  error: null
}

export default PostInfo
