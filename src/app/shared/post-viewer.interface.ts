export interface IPost {
  userId: string;
  id: number;
  title: string;
  body: string;
}

export interface IPostsState {
  posts: IPost[];
  error: string | null;
  propertyKeyMap: { [postId: number]: string };
  selectedPostId?: number | null;
}
