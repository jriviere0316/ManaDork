import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { PieChart } from "react-minimal-pie-chart";
import "./ViewDeck.css";

function ViewDeck(props) {
  const [state, setState] = React.useState({
    //STILL NEED STATE
  });

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

  const editDeck = (deck) => {
    const id = props.history.location.pathname.split("/")[2];
    props.history.push(`/editdeck/${id}`);
  };

  const cardDisplay = (card) => {
    var parsedData = JSON.parse(card.api_data);
    if (parsedData.image_uris === undefined) {
      setHoverCard(
        `https://s3.thingpic.com/images/Kz/uF3amfCnYFLBggjUNr1sPRKi.jpeg`
      );
    } else {
      setHoverCard(parsedData.image_uris.normal);
    }
  };
  const removeDisplay = (card) => {
    // console.log('left:', card.name, card, card.api_data);
    setHoverCard("https://i.stack.imgur.com/Vkq2a.png");
  };

  const countQty = (cards) => {
    if (cards) {
      var qty = 0;
      cards.forEach((card) => {
        var qtyToAdd = card.quantity;
        let totalqty = qty + qtyToAdd;
        qty = totalqty;
      });
      if (state.deckQty !== qty) {
        setState({
          deckQty: qty,
        });
      }
    }
  };

  const parseCards = (cards) => {
    return cards.map((card) => {
      const jsonData = JSON.parse(card.api_data);
      return {
        ...card,
        jsonData,
      };
    });
  };

  const devotionCalc = (cards) => {
    var devotion = {
      White: 0,
      Blue: 0,
      Black: 0,
      Red: 0,
      Green: 0,
      Gray: 0,
    };
    //TODO: .reduce instead

    cards.forEach((card) => {
      if (card.jsonData.colors.length === 0 && card.jsonData.cmc > 0) {
        //console.log("colorless card with cmc of", card.jsonData.cmc);
        devotion.Gray += card.jsonData.cmc;
      }

      for (let index = 0; index < card.jsonData.mana_cost.length; index++) {
        const element = card.jsonData.mana_cost[index];
        if (element.includes("{") || element.includes("}")) {
          //console.log('this includes a { or }');
        } else {
          //console.log("this is", element);
          if (element === "W") {
            //console.log('white');
            devotion.White += 1 * card.quantity;
          }
          if (element === "U") {
            //console.log('blue');
            devotion.Blue += 1 * card.quantity;
          }
          if (element === "B") {
            //console.log('black');
            devotion.Black += 1 * card.quantity;
          }
          if (element === "R") {
            //console.log('red');
            devotion.Red += 1 * card.quantity;
          }
          if (element === "G") {
            //console.log('green');
            devotion.Green += 1 * card.quantity;
          }
        }
      }
    });
    //console.log("NEW devotion", devotion);
    return devotion;
  };

  const cmcCalc = (cards) => {
    var convertedManaCosts = [];

    cards.forEach((card) => {
      if (card.jsonData.type_line.includes("land")) {
        //console.log('this is a land and shouldnt be counted');
      } else {
        convertedManaCosts.push(card.jsonData.cmc);
      }
    });

    //NOT SURE WHAT THIS WAS MEANT TO DO ORIGIONALLY
    convertedManaCosts.forEach((cost) => {
      //console.log(cost);
    });
    return convertedManaCosts;
  };

  const includedCards = props.reduxStore.cardList.filter(
    (card) => card.deckid === props.reduxStore.selectedDeck.id
  );
  // console.log("includedCards:", includedCards);
  const featuredCard = includedCards.filter(
    (featured) => featured.is_featured === true
  );
  const parsedFeaturedCard = featuredCard.map((fCard) =>
    JSON.parse(fCard.api_data)
  );
  // console.log("parsedFeaturedCard", parsedFeaturedCard);
  const featuredUri = parsedFeaturedCard.map((fUri) => fUri.image_uris.normal);

  countQty(includedCards);

  const parsedCards = parseCards(includedCards);

  const devotion = devotionCalc(parsedCards);

  const cmc = cmcCalc(parsedCards);

  return (
    <div>
      <h1 className="editDeckHeader">
        Viewing {props.reduxStore.selectedDeck.deckname} from{" "}
        {props.reduxStore.user.username}{" "}
      </h1>

      <div className="viewDeckEditDeckView">
        <div>
          <img
            className="featuredViewDeckCard"
            src={hoverCard}
            width="200px"
            height="280"
          />
        </div>

        <br />
        <h4 className="editDeckHeader">Total Cards: {state.deckQty}</h4>

        <table>
          <thead>
            <tr>
              <th></th>
              {/* Hovercard^ */}
              <th>Quantity</th>
              <th className="nameTh">Card Name</th>
              {/* <th>isCMDR?</th> */}
              <th></th>
              {/* isFeatured? */}
              <th></th>
              {/* Type */}
              {/* <th>DELETE</th> */}
            </tr>
          </thead>
          <tbody>
            {includedCards.map((card) => (
              <tr key={card.id}>
                <td></td>
                {/* //hovercard^ */}
                <td className="qtyTd">x {card.quantity}</td>
                <td
                  className="nameTd"
                  onMouseOver={() => cardDisplay(card)}
                  onMouseLeave={() => removeDisplay(card)}
                >
                  {card.name}
                </td>

                {/* <td>{card.is_cmdr}</td> */}
                <td>{card.is_featured}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
          {/* ////////////////////////////////////////////////////// */}
        </table>
      </div>

      <br />

      <div className="viewDeckFeaturedCardDiv">
        <h2>Featured Card</h2>
        <br />
        <div className="cardImg">
          <img src={featuredUri} width="50%" height="50%" />
          <br />
          <button onClick={() => editDeck(props.reduxStore.selectedDeck)}>
            Edit Deck
          </button>
        </div>
      </div>
      <br />
      <br />

      {/* <h5 id="upvotes">Upvotes: {props.reduxStore.selectedDeck.upvotes}</h5>
                <hr/> */}

      <div className="descriptionDiv">
        <h2 className="descriptionDivText">Description:</h2>
        <textarea
          className="descriptionInput"
          placeholder="Deck Description"
          value={props.reduxStore.selectedDeck.description}
        ></textarea>
        <br />
      </div>

      <div className="deckStats">
        <h1>Total Cards: {state.deckQty}</h1>
        <h1>Devotion</h1>
        <h3>
          White Symbols: {devotion.White} <br />
          Blue Symbols: {devotion.Blue}
          <br />
          Black Symbols: {devotion.Black}
          <br />
          Red Symbols: {devotion.Red}
          <br />
          Green Symbols: {devotion.Green}
          <br />
          Colorless Symbols: {devotion.Gray}
        </h3>
        <PieChart
          className="devotionPieChart"
          viewBoxSize="[100,100]"
          radius="50"
          data={[
            { title: "One", value: devotion.White, color: "White" },
            { title: "Two", value: devotion.Blue, color: "Blue" },
            { title: "Three", value: devotion.Black, color: "Black" },
            { title: "Four", value: devotion.Red, color: "Red" },
            { title: "Five", value: devotion.Green, color: "Green" },
            { title: "Six", value: devotion.Gray, color: "Gray" },
          ]}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (reduxStore) => ({
  reduxStore,
});

export default connect(mapStateToProps)(ViewDeck);
