import { Avatar, Box, CardHeader, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CommentI } from "@/Interfaces/comment";

import React from "react";
import { red } from "@mui/material/colors";

export default function Comment({ comment }: { comment: CommentI }) {
  return (
    <Box>
      <CardHeader
        avatar={
          <Avatar
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {comment.commentCreator.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{comment.commentCreator.name}</Typography>
            <Typography>{comment.createdAt.split("T")[0]}</Typography>
          </Box>
        }
        subheader={comment.content}
      />
    </Box>
  );
}
