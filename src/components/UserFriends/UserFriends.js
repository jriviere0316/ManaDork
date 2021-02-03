import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TemplateFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState("USER FRIENDS");

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
  return (
    <div>
      <h2>{heading}</h2>

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
