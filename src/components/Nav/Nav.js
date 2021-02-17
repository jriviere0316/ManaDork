import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/userHub';
    loginLinkData.text = 'User Home';
  }

  return (
    <div className="nav">

      <Link to="/home">
        <h2 className="nav-title">ManaDork</h2>
      </Link>

      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        
        
        {/* Always show these links since they don't need to be protected */}
        <Link className="nav-link" to="/info">
          How To Play
        </Link>        
        <Link className="nav-link" to="/lifetotal">
          Life Counter
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
        {props.store.user.id && (
          <>
            <LogOutButton className="nav-link" />
          </>
        )}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
