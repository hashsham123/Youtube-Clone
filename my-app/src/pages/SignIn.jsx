 import React from 'react'
 import styled from 'styled-components';
 import { useState } from 'react';
 import axios from "axios";
 import { useDispatch } from 'react-redux';
 import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
const Container = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 80vh;
color: ${({theme})=>theme.text};
`;

const Wrapper= styled.div`
display:flex;
align-items: center;
flex-direction: column;
background-color: ${({theme})=>theme.bgLighter};
border:1px solid ${({theme})=>theme.soft};
padding: 20px 50px;


`;

const Title = styled.h1`
font-size:24px;
`;

const Subtitle = styled.h1`
font-size: 20px;
font-weight: 300;
`;
const Input = styled.input`
border: 1px solid ${({theme})=>theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
outline: none ;
color: ${({theme})=>theme.text};
width: 100%;
margin-bottom: 10px;

`;
const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
cursor: pointer;
font-weight: 500;
background-color: ${({theme})=>theme.soft};
color: ${({theme})=>theme.textSoft};


`;
const More = styled.div`
display:flex;
margin-top: 10px;
font-size:12px;
color: ${({theme})=>theme.textSoft};
`;
const Links = styled.div`
margin-left: 50px;
;
`;
const Link = styled.span`
margin-left: 30px;

`;

const SignIn = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) =>{
  e.preventDefault();
  dispatch(loginStart());
  try{
     const res = await axios.post("/auth/signin",{name,password});
     dispatch(loginSuccess(res.data));
     console.log(res.data);
  }catch(err){
     dispatch(loginFailure());
        
  }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
    } catch (err) {
      dispatch(loginFailure());
    }
  }
  return (
    <Container>
        <Wrapper>
            <Title>
        
            Sign in
            </Title>
            <Subtitle>
                to continue to YouTube
            </Subtitle>
            <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
           <Button onClick={handleLogin}>
            Sign in 
           </Button>
           <Title>or</Title>
           
           <Input placeholder="username" onChange={e => setName(e.target.value)} />
        <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleSignUp}>
          Sign up
        </Button>
        </Wrapper>
        <More>
            English(USA)
            <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
            </Links>
        </More>
        </Container>
  )
}

export default SignIn


