"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { PostI } from "@/Interfaces/post";
import { Box } from "@mui/material";
import Comment from "../Comment/page";
import Link from "next/link";

export default function Post({
  post,
  commentLimit,
}: {
  post: PostI;
  commentLimit?: number;
}) {
  return (
    <Card sx={{ marginY: 8, mx: "auto", borderRadius: 4 }}>
      <CardHeader
        avatar={
          <Avatar
            src={post.user.photo}
            alt={post.user.name}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {post.user.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt.split("T")[0]}
      />
      {post.body && (
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {post.body}
          </Typography>
        </CardContent>
      )}
      {post?.image && (
        <CardMedia
          component="img"
          height="400px"
          image={post.image}
          alt="Image"
          sx={{ objectFit: "cover" }}
        />
      )}
      <Box>
        <Link href={"/posts/" + post._id} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "end",
              color: "gray",
              marginTop: 1,
              marginRight: 1,
              marginBottom: 0,
              cursor: "pointer",
            }}
          >
            {post.comments.length} comments
          </Typography>
        </Link>
        <CardActions
          disableSpacing
          sx={{
            justifyContent: "space-between",
            marginTop: 1,
            marginBottom: 2,
            border: "2px #eee solid",
            borderInline: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Typography>Like</Typography>
          </Box>
          <Link
            href={"/posts/" + post._id}
            style={{ textDecoration: "none", color: "gray" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <IconButton aria-label="comment">
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Typography>Comment</Typography>
            </Box>
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Typography>Share</Typography>
          </Box>
        </CardActions>
        {post.comments.length > 1 && (
          <Link href={"/posts/" + post._id} style={{ textDecoration: "none" }}>
            <Typography
              marginLeft={2}
              sx={{ color: "gray", cursor: "pointer" }}
            >
              View More Comments
            </Typography>
          </Link>
        )}
      </Box>
      {post.comments.slice(0, commentLimit).map((comment, index) => {
        return <Comment comment={comment} key={index} />;
      })}
    </Card>
  );
}
