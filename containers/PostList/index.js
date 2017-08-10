import PropTypes from 'prop-types';
import { Link } from '../../routes';
import PostUpvoter from '../PostUpvoter';
import { Section } from './styles';
import connect from './data';

const PostList = ({
  data: { allPosts, loading, _allPostsMeta },
  loadMorePosts,
  className
}) => {
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count;
    return (
      <Section className={className}>
        <ul>
          {allPosts.map((post, index) =>
            <li key={post.id}>
              <div>
                <span>
                  {index + 1}.{' '}
                </span>
                <Link
                  route="details"
                  params={{
                    postId: post.id,
                    postTitle: encodeURIComponent(post.title)
                  }}
                >
                  <a>
                    {post.title}
                  </a>
                </Link>
                <PostUpvoter id={post.id} votes={post.votes} />
              </div>
            </li>
          )}
        </ul>
        {areMorePosts
          ? <button onClick={() => loadMorePosts()}>
              {loading ? 'Loading...' : 'Show More'}
            </button>
          : ''}
      </Section>
    );
  }
  return <div>Loading</div>;
};

PostList.propTypes = {
  data: PropTypes.object.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export default connect(PostList);
