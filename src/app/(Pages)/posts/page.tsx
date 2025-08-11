"use client";
import Post from "@/app/_Components/Post/Page";
import { PostI } from "@/Interfaces/post";
import { getAllPosts } from "@/Redux/slices/postsSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Posts() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts }: { posts: PostI[] } = useSelector(
    (state: RootState) => state.posts
  );

  console.log(posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10, marginBottom: 10 }}>
      <Stack spacing={3} marginTop={3}>
        {posts.map((post, index) => {
          return <Post key={index} post={post} commentLimit={1} />;
        })}
      </Stack>
    </Container>
  );
}
