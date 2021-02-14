import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Swal from "sweetalert2";
import "./EditDeck.css";

function EditDeck(props) {
  const [state, setState] = React.useState({
    //cardSearchInput: "",
    featuredCard: "",
    recentCard: "",
    //hoverCard: "https://i.stack.imgur.com/Vkq2a.png",
    selectedCard: {},
    //qtyInput: 1,
    isPublic: props.reduxStore.selectedDeck.ispublic,
    deckname: props.reduxStore.selectedDeck.deckname,
    description: props.reduxStore.selectedDeck.description,
    defaultSearch: "",
  });

  const [cardSearchInput, setCardSearchInput] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [qtyInput, setQtyInput] = useState(1);

  const [hoverCard, setHoverCard] = useState(
    "https://i.stack.imgur.com/Vkq2a.png"
  );

  useEffect(() => {
    props.dispatch({
      type: "GET_LIST",
      payload: props.reduxStore.selectedDeck.id,
    });

    props.dispatch({
      type: "GET_SELECTED_DECK",
      payload: props.history.location.pathname.split("/")[2],
    });
  }, [state]);
  // componentDidMount() {
  //   props.dispatch({
  //     type: "GET_LIST",
  //     payload: props.reduxStore.selectedDeck.id,
  //   });

  //console.log('dispatching selected deck');

  //NOT SURE IF I NEED THIS ANYMORE?  BECAUSE I'M GETTING THE DECK FROM THE ID WHICH IS IN PROPS.HISTORY?
  // setState({
  //   ...state,
  //   deckname: props.reduxStore.selectedDeck.deckname,
  //   description: props.reduxStore.selectedDeck.description,
  //   isPublic: props.reduxStore.selectedDeck.ispublic,
  // });

  const handleFeatured = (card) => {
    console.log("in handle featured", card.id);
    card.is_featured = !card.is_featured;
    console.log("updated featured status:", card.is_featured);
    props.dispatch({
      type: "EDIT_LISTITEM",
      payload: card,
    });
  };
  const handleChange = (event, propertyName) => {
    setState({
      ...state,
      [propertyName]: event.target.value,
    });
  };

  const cardDisplay = (card) => {
    console.log("hovering on", card.name, card);
    var parsedData = JSON.parse(card.api_data);
    console.log(parsedData);
    if (parsedData.image_uris === undefined) {
      setHoverCard(
        `https://s3.thingpic.com/images/Kz/uF3amfCnYFLBggjUNr1sPRKi.jpeg`
      );
    } else {
      setHoverCard(parsedData.image_uris.normal);
    }
  };

  const removeDisplay = (card) => {
    setHoverCard("https://i.stack.imgur.com/Vkq2a.png");
  };

  const handleSearchInput = (event) => {
    console.log("event:", event.target.value);
    setCardSearchInput(event.target.value);
    console.log("cardSearchInput", cardSearchInput);
    if (cardSearchInput.length >= 2) {
      test();
    }
  };

  const handleQtyInput = (event) => {
    console.log("qty event:", event.target.value);
    setQtyInput(event.target.value);
  };

  const test = () => {
    console.log("in test:", cardSearchInput);
    props.dispatch({
      type: "FETCH_CARD",
      payload: cardSearchInput,
    });
  };

  const updateDeckAndNav = () => {
    console.log("in updateDeckAndNav");
    props.dispatch({
      type: "UPDATE_DECK",
      payload: {
        comments: props.reduxStore.selectedDeck.comments,
        decklist: props.reduxStore.selectedDeck.decklist,
        deckname: state.deckname,
        description: state.description,
        featured_card: props.reduxStore.selectedDeck.featuredCard,
        ispublic: state.isPublic,
        // upvotes: props.reduxStore.selectedDeck.upvotes,
        userid: props.reduxStore.selectedDeck.userid,
        id: props.reduxStore.selectedDeck.id,
      },
    });
    props.history.push(`/viewdeck/${props.reduxStore.selectedDeck.id}`);
  };

  const viewDeck = () => {
    const id = props.history.location.pathname.split("/")[2];
    props.history.push(`/viewdeck/${id}`);
  };

  const updateDeck = () => {
    props.dispatch({
      type: "UPDATE_DECK",
      payload: {
        comments: props.reduxStore.selectedDeck.comments,
        decklist: props.reduxStore.selectedDeck.decklist,
        deckname: state.deckname,
        //deckname: props.reduxStore.selectedDeck.deckname, //OR THIS???
        description: state.description,
        featured_card: props.reduxStore.selectedDeck.featuredCard,
        ispublic: state.isPublic,
        // upvotes: props.reduxStore.selectedDeck.upvotes,
        userid: props.reduxStore.selectedDeck.userid,
        id: props.reduxStore.selectedDeck.id,
      },
    });
    //alert(`${state.deckname} has been updated!`)
    Swal.fire(`${state.deckname} has been updated!`);
  };

  const addToDeck = () => {
    console.log("in add to deck");
    props.dispatch({
      type: "ADD_LISTITEM",
      payload: {
        name: selectedCard.name,
        quantity: qtyInput,
        is_cmdr: "false",
        is_featured: "false",
        api_data: selectedCard,
        deckid: props.reduxStore.selectedDeck.id,
        comboid: "",
      },
    });

    setCardSearchInput("");
    setQtyInput(1);
    setSelectedOption({});
    setHoverCard("https://i.stack.imgur.com/Vkq2a.png");
    // setState({
    //   ...state,
    //   cardSearchInput: [],
    //   featuredCard: "",
    //   recentCard: "",
    //   hoverCard: ,
    //   selectedCard: "",
    //   qtyInput: 1,
    //   defaultSearch: "",
    // });
    props.dispatch({
      type: "UNSET_CARD",
    });
  };

  const selectOption = (option) => {
    console.log("selectOption SELECTED:", option.name, option);
    setSelectedCard(option);
    setCardSearchInput(option.name);
  };

  const updateSearchImage = (option) => {
    console.log("in updateSearchImage with:", option.name);
    if (option.image_uris === undefined) {
      setHoverCard(
        `https://s3.thingpic.com/images/Kz/uF3amfCnYFLBggjUNr1sPRKi.jpeg`
      );
    } else {
      setHoverCard(option.image_uris.normal);
    }
  };

  const qtyDown = (card) => {
    console.log("clicked -", card.name, card.quantity, card);
    console.log("this cards qty is:", card.quantity);
    let qtyLess = (card.quantity -= 1);
    console.log(qtyLess);
    props.dispatch({
      type: "EDIT_LISTITEM",
      payload: card,
    });
  };

  const qtyUp = (card) => {
    console.log("clicked + on: ", card.name, card);
    console.log("this cards qty is:", card.quantity);
    let qtyMore = (card.quantity += 1);
    console.log(qtyMore);
    props.dispatch({
      type: "EDIT_LISTITEM",
      payload: card,
    });
  };

  const deleteCard = (card) => {
    console.log("clicked delete on:", card.name);
    props.dispatch({
      type: "DELETE_LISTITEM",
      payload: card,
    });
  };

  const handleRadio = () => {
    console.log("in handle radio");
  };

  // console.log("recentCard state:", state.recentCard);
  // console.log("redux state of cards:", props.reduxStore.card);
  // console.log("state of cards at [0]", props.reduxStore.card[0]);
  // console.log("selected deck:", props.reduxStore.selectedDeck);
  // console.log('hoverCard:', state.hoverCard);
  // console.log('selectedCard:', state.selectedCard.name, state.selectedCard);
  // console.log(state.isPublic);
  // console.log('qtyInput:', state.qtyInput);

  const includedCards = props.reduxStore.cardList.filter(
    (card) => card.deckid === props.reduxStore.selectedDeck.id
  );

  const featuredCard = includedCards.filter(
    (featured) => featured.is_featured === true
  );

  const mappedFeaturedCard = featuredCard.map((fCard) =>
    JSON.parse(fCard.api_data)
  );

  const featuredUri = mappedFeaturedCard.map((fUri) => fUri.image_uris.normal);

  // console.log('mappedFeaturedCard is:', mappedFeaturedCard);
  // console.log('mappedFeaturedCard image uri is:', mappedFeaturedCard.artist);
  // console.log('featuredUri:', featuredUri);
  // console.log('description:', state.description);
  // console.log("state is:", state);

  return (
    <div>
      <div>
        <h1 id="editDeckHeader">
          Editing: {props.reduxStore.selectedDeck.deckname}{" "}
        </h1>
      </div>

      <div className="descriptionDiv">
        {/*                         DECK NAME                     */}
        <input
          id="deckName"
          placeholder="Deck Name"
          defaultValue={props.reduxStore.selectedDeck.deckname}
          onChange={(event) => handleChange(event, "deckname")}
        ></input>

        <br />
        {/*                         DESCRIPTION                    */}

        <textarea
          className="descriptionInput"
          placeholder="Deck Description"
          onChange={(event) => handleChange(event, "description")}
          defaultValue={props.reduxStore.selectedDeck.description}
        ></textarea>
        <br />

        {/* <button onClick={saveAndNav}>Save</button> */}
        <button onClick={updateDeckAndNav}>Save & View</button>
        <button onClick={updateDeck}>Save</button>
      </div>

      <br />

      <div className="editDeckView">
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Card Name</th>
              {/* <th>isCMDR?</th> */}
              <th>Featured?</th>

              <th>Edit</th>
              {/* Type */}
              <th>DELETE</th>
            </tr>
          </thead>

          {/* <div id="optionsScrollDiv"> */}
          <tbody>
            {includedCards.map((card) => (
              <tr key={card.id}>
                <td className="qtyTd">x {card.quantity}</td>
                <td
                  onMouseOver={() => cardDisplay(card)}
                  onMouseLeave={() => removeDisplay(card)}
                >
                  {card.name}
                </td>
                {/* <td>{card.is_cmdr}</td> */}
                <td>
                  <input
                    type="checkbox"
                    className="myCheck"
                    defaultValue={card.is_featured}
                    defaultChecked={card.is_featured}
                    onChange={() => handleFeatured(card)}
                  />{" "}
                </td>
                <td>
                  <button
                    className="incrementBtn"
                    onClick={() => qtyDown(card)}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <button className="incrementBtn" onClick={() => qtyUp(card)}>
                    +
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteCard(card)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* </div> */}
        </table>
      </div>
      <br />
      <div>
        {/* <h1>{props.reduxStore.card}</h1> */}
        <form className="cardInputForm">
          {hoverCard.length >= 1 ? (
            <>
              <img
                src={hoverCard}
                alt="Card Display"
                width="215px"
                height="300px"
              />
            </>
          ) : (
            <>
              {/* <img src={props.reduxStore.card[0].image_uris.normal}
                                alt='Card Display' width='215px' height='300px'/> */}
            </>
          )}
          <br />
          <input
            className="cardSearchInput"
            placeholder="Card Name"
            value={cardSearchInput}
            onChange={handleSearchInput}
          ></input>
          <br />

          {cardSearchInput.length >= 1 ? (
            <div className="optionsDiv">
              <ul className="cardOptions">
                {props.reduxStore.card.map((option, i) => (
                  <li
                    key={`${i + 1}${option.id}`}
                    value={option}
                    className="optionLi"
                    onMouseOver={() => updateSearchImage(option)}
                    onMouseLeave={() => removeDisplay(option)}
                    onClick={() => selectOption(option)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}

          <input
            type="number"
            placeholder="Quantity"
            value={qtyInput}
            onChange={handleQtyInput}
          ></input>
          <br />
          <button onClick={addToDeck}> Add To Deck → </button>
          <br />
          {/* <label htmlFor="isCmdrinput">Is this your commander?</label><br/>
                        <input type="checkbox" id="isCmdrinput" value="Commander"></input><br/> */}
          <button onClick={viewDeck}>View Deck</button>
          {/* <button onClick={saveAndStay}>Save and Continue Editing</button><br/> */}
        </form>
      </div>

      <br />

      <br />
      <div className="featuredCardDiv">
        <h2>Featured Card</h2>
        <br />
        <div className="cardImg">
          <img src={featuredUri} width="50%" height="50%" />
        </div>
      </div>
    </div>
  );
}
//}

const mapStateToProps = (reduxStore) => ({
  reduxStore,
});

export default connect(mapStateToProps)(EditDeck);
