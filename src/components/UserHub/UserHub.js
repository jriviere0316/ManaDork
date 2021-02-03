import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Swal from "sweetalert2";
import UserDecks from "../UserDecks/UserDecks";
import UserFriends from "../UserFriends/UserFriends";

function UserHub(props) {
  //"STATE" STUFF
  useEffect(() => {
    //console.log("in useEffect");
    props.dispatch({ type: "GET_FRIENDS" });
  }, [state]);

  const [state, setState] = React.useState({});

  //FUNCTIONS
  const editProfile = (deck) => {
    props.history.push("/edituser");
  };

  return (
    <div>
      <img
        className="profilePic"
        height="130px"
        width="130px"
        src={props.store.user.img_url}
      ></img>
      <div className="profileInfo">
        <h1>Hello {props.store.user.username}!</h1>
        <button onClick={editProfile}>Edit Profile</button>
      </div>
      <hr />

      <div className="mainDiv">
        <UserDecks history={props.history} />
        <UserFriends history={props.history} />
      </div>
    </div>
  );
}

export default connect(mapStoreToProps)(UserHub);
