import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Swal from "sweetalert2";
import UserDecks from '../UserDecks/UserDecks';

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
  //TODO:
  const viewUsers = () => {
    console.log("in viewUsers");
  };
  //TODO: create viewFriend component and populate with selected friend's info
  const viewFriend = (friend) => {
    console.log("in viewFriend with:", friend);
  };
  const friendsList = props.store.friendsReducer.filter(
    (user) => user.id !== props.store.user.id
  );
  //console.log("friendsList is", friendsList);

  console.log('props are,', props);
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
        <UserDecks history={props.history}/>

        <div className="userDiv">
          <h1>{props.store.user.username}'s Friends</h1>
          <br />
          <button onClick={viewUsers}>View/Search Users</button>
          <hr />
          <div className="friendsDeckScroll">
            {friendsList.map((friend) => (
              <div className="friendOptions" key={friend.id}>
                <h4 className="deckName" onClick={() => viewFriend(friend)}>
                  {friend.username}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStoreToProps)(UserHub);