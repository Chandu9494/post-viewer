export interface IPost {
  _id: string;
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPostsState {
  posts: IPost[];
  error: string | null;
  propertyKeyMap: { [postId: string]: string };
  selectedPostId?: string | null;
}

export interface ImageState {
  images: string[];
  loading: boolean;
  error: any;
}
