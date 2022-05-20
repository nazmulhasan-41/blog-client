import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const loggedInUser=localStorage.getItem('loggedInUser');
  const [user,setUser]=useState(loggedInUser);

  const logoutHandler=()=>{
    localStorage.setItem('loggedInUser','');
    setUser('');
  }
  
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className=" links">
          <Link className='headerLink' to="/">Home</Link>

          <Link className='headerLink' to="/blogs">Blogs</Link>


          <Link className='headerLink' to="/about">About</Link>
          {
            loggedInUser?     <Link className='headerLink' to="#" onClick={logoutHandler}>Logout</Link>
            :
            <Link className='headerLink' to="/login" >Login</Link>

          }
          
          {loggedInUser && <Link className='headerLink' to="/dashboard">Dashboard  {user}</Link>}
          


        </Nav>
      </Container>


    </Navbar>
  );
};

export default Header;