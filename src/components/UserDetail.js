import React, { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import {
  Avatar,
  Box,
  IconButton,
  Modal,
  TextField,
  Input,
  Typography,
  Button,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./home/SideBar";
import Postbar from "./home/Postbar";
import axios from "axios";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import RefreshIcon from "@mui/icons-material/Refresh";
import CachedIcon from "@mui/icons-material/Cached";

const UserDetail = () => {
  const [{ ownPost, userName, token }, dispatch] = useStateProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [flag, setflag] = useState("");
  const [saveId, setSaveId] = useState("");

  const fileInputRef = useRef(null);

  const openModal = (post) => {
    setPostImage(null);
    setflag("");
    setIsModalOpen(true);
    setSaveId(post._id);
    console.log(token);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      setPostImage(selectedFile);
      setflag(selectedFile.name);
    }
  };

  const handleRepost = (post) => {
    const postIndex = ownPost.findIndex((p) => p._id === post._id);

    if (postIndex !== -1) {
      const updatedPosts = [...ownPost];
      updatedPosts.splice(postIndex, 1);
      dispatch({ type: "SET_OWNPOSTDUP", payload: updatedPosts });
    }
  };
  const handlePostSubmit = async () => {
    console.log(postTitle);
    console.log(postContent);
    console.log(postImage);
    const body = new FormData();
    body.append("title", postTitle);
    body.append("content", postContent);
    body.append("images", postImage);
    console.log(saveId);
    await axios
      .patch(
        `https://academics.newtonschool.co/api/v1/linkedin/post/${saveId}/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectId: "f104bi07c490",
          },
        },
      )
      .then((response) => {
        console.log(response);

        dispatch({ type: "SET_OWNPOST", payload: response.data.data });
      })
      .catch((err) => console.log(err));

    setPostTitle("");
    setPostContent("");
    console.log("hey there");
    setPostImage(null);

    closeModal();
  };

  const handleLike = (post) => {
    const postIndex = ownPost.findIndex((p) => p._id === post._id);

    if (postIndex !== -1) {
      const updatedPosts = [...ownPost];
      const updatedPost = { ...updatedPosts[postIndex] };

      if (!updatedPost.liked) {
        updatedPost.color = "blue";
      } else {
        updatedPost.color = "#676767";
      }

      updatedPost.liked = !updatedPost.liked;
      updatedPosts[postIndex] = updatedPost;
      console.log(ownPost);
      dispatch({ type: "SET_OWNPOSTDUP", payload: updatedPosts });
    }
  };

  // const handleCommentAdd = async (post) => {
  //   const bodyContent = JSON.stringify({
  //     content: "content",
  //   });
  //   let headersList = {
  //     Authorization: `Bearer ${token}`,
  //     projectId: "f104bi07c490",
  //   };

  //   await axios
  //     .post(
  //       `https://academics.newtonschool.co/api/v1/linkedin/comment/${post._id}`,
  //       { headers: headersList },
  //       { body: bodyContent },
  //     )
  //     .then((response) => {
  //       console.log(post._id);
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setPostTitle("");
  //   setPostContent("");
  //   setPostImage(null);
  // };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt="7px"
      sx={{ "@media(max-width:650px)": { flexDirection: "column" } }}>
      <Box>
        <SideBar />
      </Box>

      <Box
        width="50%"
        ml="13px"
        sx={{ "@media(max-width:650px)": { width: "93.4%" } }}>
        <Box
          pb="1px"
          sx={{
            background: "white",
            "@media(max-width:650px)": { width: "100%", ml: "6px" },
          }}>
          <Postbar />
        </Box>
        <Box
          width="95%"
          flexDirection="column"
          mt="7px"
          sx={{
            display: ownPost.length === 0 ? "none" : "flex",
            "@media(max-width:650px)": { width: "97.4%", ml: "6px" },
          }}
          gap="5px">
          {ownPost?.map((post) => {
            return (
              <Box
                width="100%"
                borderRadius="13px"
                display="flex"
                padding="20px 32px 0px 0px"
                flexDirection="column"
                sx={{
                  background: "white",
                  cursor: "pointer",
                  "@media(max-width:760px)": { pr: "20px" },
                }}>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" ml="20px">
                    <Avatar width="50px" height="50px">
                      A
                    </Avatar>
                    <Typography
                      alignSelf="center"
                      ml="8px"
                      fontSize="21px"
                      fontWeight="600">
                      {userName}
                    </Typography>
                  </Box>
                  <CachedIcon
                    onClick={() => {
                      openModal(post);
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  ml="35px"
                  pl="31px"
                  pb="10px">
                  <Typography
                    variant="h5"
                    color="#7a7aea"
                    fontSize="16px"
                    fontWeight="600">
                    {post.title}
                  </Typography>
                  <Typography fontSize="15px">{post.content}</Typography>
                </Box>
                <img
                  src={post.images && post.images[0]}
                  style={{
                    display: post.images && post.images.length === 0 && "none",
                  }}
                  width="100%"
                  height="400px"
                />
                <Box
                  display="flex"
                  width="100%"
                  justifyContent="space-between"
                  mb="10px">
                  <Box
                    display="flex"
                    ml="10px"
                    height="40px"
                    onClick={() => handleLike(post)}
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      width: "22%",
                      justifyContent: "center",
                      color: post.color,
                      "&:hover": { background: "#f1efef" },
                    }}>
                    <ThumbUpIcon />
                    <Typography ml="5px">Like</Typography>
                  </Box>
                  <Box
                    display="flex"
                    height="40px"
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      width: "22%",
                      justifyContent: "center",
                      color: "#676767",
                      "&:hover": { background: "#f1efef" },
                    }}>
                    <MessageIcon />
                    <Typography ml="5px">Comment</Typography>
                  </Box>
                  <Box
                    display="flex"
                    height="40px"
                    onClick={() => {
                      handleRepost(post);
                    }}
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      width: "22%",
                      justifyContent: "center",
                      color: "#676767",
                      "&:hover": { background: "#f1efef" },
                    }}>
                    <DeleteIcon />
                    <Typography ml="5px">Delete</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "744px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            "@media(max-width:800px)": {
              width: "500px",
            },
            "@media(max-width:600px)": {
              width: "300px",
            },
          }}>
          <Box display="flex" alignItems="center" gap="12px">
            <Avatar width="50px" height="50px">
              A
            </Avatar>
            <Typography>{userName}</Typography>
          </Box>
          <TextField
            onChange={(e) => setPostTitle(e.target.value)}
            value={postTitle}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
              width: "100%",
            }}
            placeholder="Enter the Title"
            variant="outlined"
            multiline
          />
          <TextField
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
              width: "100%",
              height: "440px",
              overflowY: "scroll",
            }}
            placeholder="What do you want to talk about"
            variant="outlined"
            multiline
          />
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <IconButton onClick={handleIconClick}>
                <InsertPhotoIcon />
              </IconButton>
              <Input
                type="file"
                inputRef={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Typography alignSelf="center">{flag}</Typography>
            </Box>
            <Button
              onClick={handlePostSubmit}
              variant="contained"
              color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserDetail;
