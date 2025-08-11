"use client";

import * as React from "react";
import Post from "@/app/_Components/Post/Page";
import { getSinglePost } from "@/Redux/slices/postsSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function PostDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(props.params);

  const { post } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id, dispatch]);

  return (
    <Container maxWidth="md">
      {post ? <Post post={post} /> : <h1>Loading...</h1>}
    </Container>
  );
}
