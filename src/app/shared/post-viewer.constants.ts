import { IPostsState } from './post-viewer.interface';

export const initialState: IPostsState = {
  posts: [],
  error: null,
  propertyKeyMap: {},
  selectedPostId: null,
};
