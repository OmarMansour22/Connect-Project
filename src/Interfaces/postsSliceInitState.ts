import { PostI } from "./post";

export interface PostsSliceInitState {
  posts: PostI[],
  post: PostI|null
}
