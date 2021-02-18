import React, { } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

function TemplateFunction(props) {
  //TODO: route to a component where we can search all users and add to friends list
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
  return (
    <div>
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
  );
}

export default connect(mapStoreToProps)(TemplateFunction);
