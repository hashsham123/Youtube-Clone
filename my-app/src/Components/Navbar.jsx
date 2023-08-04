import React, { useState } from 'react'
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Upload from './Upload';
import LogoutButton from "./Logout";


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;

`;

const Search = styled.div`  
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;

  
`;
const Input = styled.input`
  border: none;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
display: flex;
align-items: center;
font-weight: 500;
color: ${({theme})=>theme.text};
gap: 10px;
`;

const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: aliceblue;
`;

const Navbar = () => {
  const [open,setOpen] = useState(false)
  const {currentUser} = useSelector(state => state.user);
  
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchIcon />
        </Search>
     {currentUser?(<User>
      <VideoCallIcon onClick={()=>setOpen(true)}/>
      <Avatar />
      {currentUser.name}
      <LogoutButton onClick/>
     </User> ):<Link to="signin" style={{textDecoration:"none"}}>
        <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>
        </Link>}
        
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen}/>}
    </>
  );
};


export default Navbar