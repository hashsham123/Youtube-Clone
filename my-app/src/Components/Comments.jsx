import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [videoId]);

  // Function to handle the submission of the new comment
  const handleAddComment = async () => {
    try {
      if (newCommentText.trim() === '') {
        // Do not submit an empty comment
        return;
      }

      const commentData = {
        userId: currentUser.id,
        videoId: videoId,
        desc: newCommentText,
      };

      const res = await axios.post("/comments", commentData);
      const savedComment = res.data;

      // Update the comments state with the newly added comment
      setComments([...comments, savedComment]);

      // Clear the input field after submission
      setNewCommentText('');
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Send</button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
