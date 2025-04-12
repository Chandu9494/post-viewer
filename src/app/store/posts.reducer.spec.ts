import { postsReducer } from './posts.reducer';
import * as PostActions from './posts.action';
import { initialState } from '../shared/post-viewer.constants';
import { IPost } from '../shared/post-viewer.interface';

describe('Posts Reducer', () => {
  it('should return the initial state when an unknown action is dispatched', () => {
    const action = { type: 'Unknown' } as any;
    const state = postsReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should handle postFetchSuccess', () => {
    const mockPosts: IPost[] = [
      {
        id: 1,
        title: 'Post 1',
        userId: '',
        body: '',
      },
    ];
    const action = PostActions.postFetchSuccess({ posts: mockPosts });
    const result = postsReducer(initialState, action);
    expect(result.posts).toEqual(mockPosts);
    expect(result.error).toBeNull();
  });

  it('should handle postFetchFailed', () => {
    const mockError = 'Failed to fetch posts';
    const action = PostActions.postFetchFailed({ error: mockError });
    const result = postsReducer(initialState, action);
    expect(result.error).toBe(mockError);
  });

  it('should handle selectPost', () => {
    const postId = 4;
    const action = PostActions.selectPost({ postId });
    const result = postsReducer(initialState, action);
    expect(result.selectedPostId).toBe(postId);
    expect(result.error).toBeNull();
  });

  it('should handle setDisplayedPropertyKey', () => {
    const postId = 99;
    const displayedKey = 'author';
    const action = PostActions.setDisplayedPropertyKey({
      postId,
      displayedKey,
    });
    const result = postsReducer(initialState, action);
    expect(result.propertyKeyMap[postId]).toBe(displayedKey);
  });
});
