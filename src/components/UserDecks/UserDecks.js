import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Swal from "sweetalert2";

function UserDecks(props) {
  const [state, setState] = React.useState({});
  const viewDeck = (deck) => {
    //console.log("in viewDeck with:", deck);
    props.history.push(`viewdeck/${deck}`);
  };
  const editDeck = (deck) => {
    //console.log("in editDeck with:", deck);
    props.history.push(`editdeck/${deck}`);
  };
  const deleteDeck = (deck) => {
    //console.log("in delete deck with:", deck);
    Swal.fire({
      title: "Are you sure?",
      //TODO: Import this image
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
          //TODO: Import this image
          imageUrl: `https://media.wizards.com/2017/images/daily/c4rd4r7_HZKwaCZ0af.jpg`,
        });
      }
    });
  };
  const createDeck = () => {
    //console.log("create deck clicked");
    var txt;
    var deck = prompt("Please enter a deck name:", "My Awesome Deck");
    if (deck === null || deck === "") {
      txt = "Canceled!";
      Swal.fire({
        title: `${txt}`,
        //TODO: Import this image
        imageUrl: `https://media.magic.wizards.com/image_legacy_migration/images/magic/daily/arcana/1094_cancel_ZEN.jpg`,
      });
      return;
    } else {
      txt = deck;
      //console.log(txt);
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
        //TODO: Import this image
        imageUrl: `https://www.greatnessatanycost.com/wp-content/uploads/2019/05/Karn-the-Great-Creator-War-of-the-Spark-Arts-cut.jpg`,
      });
    }
  };

  return (
    <div className="userDiv">
      <h1>{props.store.user.username}'s Decks</h1>
      <br />
      <button onClick={createDeck}>Create New Deck</button>
      <hr />
      <div className="userDeckScroll">
        {props.store.deck.map((deck) => (
          <div className="deckOptions" key={deck.id}>
            <h4 className="deckName" onClick={() => viewDeck(deck.id)}>
              {deck.deckname}
            </h4>
            <h5 className="upvotes">Upvotes: {deck.upvotes}</h5>
            <button onClick={() => editDeck(deck.id)}>EDIT</button>
            <button onClick={() => deleteDeck(deck.id)}>DELETE</button>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default connect(mapStoreToProps)(UserDecks);
