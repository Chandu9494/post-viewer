import { createAction, props } from "@ngrx/store";
import { IPost } from "../shared/post-viewer.interface";

export const getPosts = createAction('Load Posts From API');
export const postFetchSuccess= createAction('Load Success', props <{posts: IPost[]}>());
export const postFetchFailed = createAction('Load failed', props <{error: any}>()); //update type