import styled from '@emotion/styled'
import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Comment from './Comment';
const Container = styled.div`
`;
const NewComment = styled.div`
display: flex;
align-items: center;
gap: 10px;
`;
const Avatar = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;`;
const Input = styled.input`
  color: ${({ theme }) => theme.text};
border: none;
border-bottom: 1px solid ${({theme})=>theme.soft};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
`;



const Comments = ({videoId}) => {
  const {currentUser}=useSelector((state)=>state.user);
  const [comments,setCommments]=useState([]);
  useEffect(()=>{
    const fetchComments=async ()=>{
      try{
        const res = await axios.get(`/comment/${videoId}`);
        setCommments(res.data);
      }catch(arr){}
    };  fetchComments();
  },[videoId]);
  return (
   <Container>
    <NewComment>
        <Avatar src={currentUser.img}/>
        
        <Input placeholder='Add a comment'/>
    </NewComment>
    {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
    ))}
    
   </Container>
      

  )
}

export default Comments