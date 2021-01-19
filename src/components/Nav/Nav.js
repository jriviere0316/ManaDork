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
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
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
        {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/edituser">
              Edit User
            </Link> */}
            <Link className="nav-link" to="/userHub">
            userHub
            </Link>
            <Link className="nav-link" to="/info">
              How To Play
            </Link>
            <Link className="nav-link" to="/lifetotal">
              Life Counter
            </Link>
            {/* <Link className="nav-link" to="/editdeck">
              Edit Deck
            </Link>
            <Link className="nav-link" to="/viewdeck">
              View Deck
            </Link> */}
            <Link className="nav-link" to="/about">
          About
        </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        


      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
