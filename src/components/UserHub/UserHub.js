import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Swal from "sweetalert2";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserHub(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState("User Hub w/ Hooks");
  //const [user, setUser] = useState('')

  //"STATE" STUFF
  useEffect(() => {
    console.log("in useEffect");
    props.dispatch({ type: "GET_FRIENDS" });
    //checkTaskMap();
  }, [state]);

  const [state, setState] = React.useState({});

  //FUNCTIONS
  const viewDeck = (deck) => {
    console.log("in viewDeck with:", deck);
    props.history.push(`viewdeck/${deck}`);
  };
  const editDeck = (deck) => {
    console.log("in editDeck with:", deck);
    props.history.push(`editdeck/${deck}`);
  };
  const editProfile = (deck) => {
    // console.log('in editDeck with:', deck);
    // props.history.push(`editdeck/${deck}`)
    props.history.push("/edituser");
  };
  const deleteDeck = (deck) => {
    console.log("in delete deck with:", deck);
    //var r = window.confirm(`Are you sure you want to permanenently delete this deck? `)
    //Swal.fire(`Are you sure you want to permanenently delete this deck? `)
    Swal.fire({
      title: "Are you sure?",
      imageUrl: `https://cdn.cardsrealm.com/images/cartas/crop/m13-magic-2013/door-to-nothingness-203-min.jpeg?1578`,
      text: "You will not be able to recover this deck after confirming!",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        props.dispatch({
          type: "DELETE_DECK",
          payload: deck,
        });

        Swal.fire("Deleted!", "Your deck has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Your deck is safe! :)",
          imageUrl: `https://media.wizards.com/2017/images/daily/c4rd4r7_HZKwaCZ0af.jpg`,
        });
      }
    });
  };
  const createDeck = () => {
    console.log("create deck clicked");

    // const {value: deckname} = Swal.fire({
    //     title: 'Enter new deck name',
    //     input: 'text',
    //     inputLabel: 'Your new deck name:',
    //     //inputValue: inputValue,
    //     showCancelButton: true,
    // })

    var txt;
    var deck = prompt("Please enter a deck name:", "My Awesome Deck");
    if (deck === null || deck === "") {
      txt = "Canceled!";
      //alert(txt)
      Swal.fire({
        title: `${txt}`,
        imageUrl: `https://media.magic.wizards.com/image_legacy_migration/images/magic/daily/arcana/1094_cancel_ZEN.jpg`,
      });
      return;
    } else {
      txt = deck;
      //   alert(txt)
      console.log(txt);
      props.dispatch({
        type: "CREATE_DECK",
        payload: {
          userid: props.store.user.id,
          deckname: txt,
          ispublic: false,
          description: "",
          decklist: "",
          featured_card: "",
          upvotes: 0,
          comments: "",
        },
      });
      Swal.fire({
        title: `New deck created: ${txt}`,
        imageUrl: `https://www.greatnessatanycost.com/wp-content/uploads/2019/05/Karn-the-Great-Creator-War-of-the-Spark-Arts-cut.jpg`,
      });
    }
    // // this.props.history.push('/editdeck')   //NEED TO REFERENCE NEWLY CREATED DECK
  };
  const viewUsers = () => {
    console.log("in viewUsers");
  };
  const viewFriend = (friend) => {
    console.log("in viewFriend with:", friend);
  };

  const friendsList = props.store.friendsReducer.filter(
    (user) => user.id !== props.store.user.id
  );
  console.log("friendsList is", friendsList);

  return (
    <div>
      {/* <h2>{heading}</h2> */}
      {/* <h2>Hello {props.store.user.username} </h2> */}
      <img
        id="profilePic"
        height="130px"
        width="130px"
        src={props.store.user.img_url}
      ></img>
      <div id="profileInfo">
        <h1 id="welcome">Welcome, {props.store.user.username}!</h1>
        <button onClick={editProfile}>Edit Profile</button>
      </div>
      {/* <p>Your ID is: {props.store.user.id}</p> */}
      <hr />
      <div id="mainDiv">
        <div id="userDiv">
          <h1>{props.store.user.username}'s Decks</h1>
          <br />
          <button onClick={createDeck}>Create New Deck</button>
          <hr />

          <div id="userDeckScroll">
            {props.store.deck.map((deck) => (
              <div id="deckOptions" key={deck.id}>
                <h4 id="deckName" onClick={() => viewDeck(deck.id)}>
                  {deck.deckname}
                </h4>
                <h5 id="upvotes">Upvotes: {deck.upvotes}</h5>
                <button onClick={() => editDeck(deck.id)}>EDIT</button>
                <button onClick={() => deleteDeck(deck.id)}>DELETE</button>

                <br />
              </div>
            ))}
          </div>
        </div>

        {/* ////////////// FRIENDS SCROLL BOX ////////////// */}

        <div id="userDiv">
          <h1>{props.store.user.username}'s Friends</h1>
          <br />
          <button onClick={viewUsers}>View/Search Users</button>
          <hr />
          <div id="friendsDeckScroll">
            {friendsList.map((friend) => (
              <div id="friendOptions" key={friend.id}>
                <h4 id="deckName" onClick={() => viewFriend(friend)}>
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
