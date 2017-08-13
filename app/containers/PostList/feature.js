import PropTypes from 'prop-types'
import { Link } from '~/routes'
import PostUpvoter from '~/containers/PostUpvoter'
import * as S from './styles'

const PostList = ({
  data: { allPosts, loading, _allPostsMeta },
  loadMorePosts
}) => {
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count
    return (
      <S.Main>
        <S.ItemList>
          {allPosts.map((post, index) =>
            <S.Item key={post.id}>
              <div>
                <S.Index>
                  {index + 1}.{' '}
                </S.Index>
                <Link
                  route="details"
                  params={{
                    postId: post.id,
                    postTitle: encodeURIComponent(post.title)
                  }}
                  passHref
                >
                  <S.Title>
                    {post.title}
                  </S.Title>
                </Link>
                <PostUpvoter id={post.id} votes={post.votes} />
              </div>
            </S.Item>
          )}
        </S.ItemList>
        {areMorePosts
          ? <S.ShowMore onClick={() => loadMorePosts()}>
              {loading ? 'Loading...' : 'Show More'}
            </S.ShowMore>
          : ''}
      </S.Main>
    )
  }
  return <S.Loading>Loading</S.Loading>
}

PostList.propTypes = {
  data: PropTypes.object.isRequired,
  loadMorePosts: PropTypes.func.isRequired
}

export default PostList
