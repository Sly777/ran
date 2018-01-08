// @flow
import * as React from 'react';
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

type Props = {
  data: {
    allPosts: Array<Post>,
    _allPostsMeta: { count: number },
    loading: boolean
  },
  loadMorePosts: () => void
};

const PostList = ({ data, loadMorePosts }: Props) => {
  if (data.allPosts && data.allPosts.length) {
    const areMorePosts = data.allPosts.length < data._allPostsMeta.count;
    return (
      <Main>
        <ItemList>
          {data.allPosts.map((post, index) => (
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
            {data.loading ? 'Loading...' : 'Show More'}
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
