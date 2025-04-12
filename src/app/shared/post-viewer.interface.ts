export interface IPost{
    userId: string,
    id: string,
    title: string,
    body: string
}

export interface IPostsState {
    posts: IPost[];
    error: any; //update types
  }
  