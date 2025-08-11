import axios from "axios";
import { PostsSliceInitState } from "./../../Interfaces/postsSliceInitState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const { data } = await axios.get("https://linked-posts.routemisr.com/posts", {
    headers: {
      token: Cookies.get("token"),
    },
  });

  return data.posts;
});

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (postId: string) => {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + postId,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );

    return data.post;
  }
);

const initialState: PostsSliceInitState = {
  posts: [],
  post: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
