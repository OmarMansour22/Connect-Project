import { UserI } from "./user"
import { CommentI } from "./comment"

export interface PostI {
  _id: string
  body: string
  image: string
  user: UserI
  createdAt: string
  comments: CommentI[]
  id: string
}