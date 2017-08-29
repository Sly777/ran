import PropTypes from 'prop-types';
import { Link } from '../../routes';
import PostUpvoter from '../PostUpvoter';
import {
  Main,
  ItemList,
  Item,
  Index,
  Title,
  ShowMore,
  Loading
} from './styles';
import connect from './store';

const PostList = ({
  data: { allPosts, loading, _allPostsMeta },
  loadMorePosts
}) => {
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count;
    return (
      <Main>
        <ItemList>
          {allPosts.map((post, index) => (
            <Item key={post.id}>
              <div>
                <Index>{index + 1}. </Index>
                <Link
                  route="details"
                  params={{
                    postId: post.id,
                    postTitle: encodeURIComponent(post.title)
                  }}
                  passHref
                >
                  <Title>{post.title}</Title>
                </Link>
                <PostUpvoter id={post.id} votes={post.votes} />
              </div>
            </Item>
          ))}
        </ItemList>
        {areMorePosts ? (
          <ShowMore onClick={() => loadMorePosts()}>
            {loading ? 'Loading...' : 'Show More'}
          </ShowMore>
        ) : (
          ''
        )}
      </Main>
    );
  }
  return <Loading>Loading</Loading>;
};

PostList.propTypes = {
  data: PropTypes.object.isRequired,
  loadMorePosts: PropTypes.func.isRequired
};

export default connect(PostList);
