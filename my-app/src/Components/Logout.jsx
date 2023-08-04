import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
cursor: pointer;
font-weight: 500;
background-color: ${({theme})=>theme.soft};
color: ${({theme})=>theme.textSoft};
`;


const LogoutButton = () => {
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      // Dispatch the logout action
      dispatch(logout());
    };
  
    return (
      <Link to="/signin" style={{ textDecoration: 'none' }}>
      <Button onClick={handleLogout}>Logout</Button>
    </Link>
    );
  };
  
  export default LogoutButton;
  