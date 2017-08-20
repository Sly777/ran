import moment from 'moment'
import PropTypes from 'prop-types'
import * as S from './styles'

const PostInfo = ({ loading, Post, error }) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
    return
  }

  if (loading) {
    return (
      <S.Section>
        <h1>Loading...</h1>
      </S.Section>
    )
  }

  if (!Post) {
    return (
      <S.Section>
        <h1>No such post</h1>
      </S.Section>
    )
  }

  return (
    <S.Section>
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
        <S.A target="_blank" href={Post.url} rel="noopener noreferrer nofollow">
          {Post.url}
        </S.A>
      </p>
    </S.Section>
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
