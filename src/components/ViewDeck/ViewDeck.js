import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// mapStoreToProps vs. mapStateToProps?
// import mapStoreToProps from "../../redux/mapStoreToProps";
import { PieChart } from "react-minimal-pie-chart";
import "./ViewDeck.css";

function ViewDeck({ selectedDeck, user, history, dispatch, cardList }) {
  //DISPATCHES
  useEffect(() => {
    dispatch({
      type: "GET_LIST",
      payload: selectedDeck.id,
    });
    dispatch({
      type: "GET_SELECTED_DECK",
      payload: history.location.pathname.split("/")[2],
    });
  }, []);

  //MANA CALCULATIONS
  useEffect(() => {
    const includedCards = cardList.filter(
      (card) => card.deckid === selectedDeck.id
    );
    getManaCalculations(includedCards);
  }, [cardList]);

  const [includedCards, setIncludedCards] = useState([]);
  const [cmc, setCmc] = useState([]);
  const [averageCmc, setAverageCmc] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [featuredUri, setFeaturedUri] = useState("");
  const [hoverCard, setHoverCard] = useState(
    "https://i.stack.imgur.com/Vkq2a.png"
  );
  const [devotion, setDevotion] = useState({
    White: 0,
    Blue: 0,
    Black: 0,
    Red: 0,
    Green: 0,
    Gray: 0,
  });

  const NavToEditDeck = (deck) => {
    history.push(`/editdeck/${deck.id}`);
  };

  const setDisplayCard = (card) => {
    var parsedData = JSON.parse(card.api_data);
    if (parsedData.image_uris === undefined) {
      setHoverCard(
        `https://s3.thingpic.com/images/Kz/uF3amfCnYFLBggjUNr1sPRKi.jpeg`
      );
    } else {
      setHoverCard(parsedData.image_uris.normal);
    }
  };
  const removeDisplayCard = (card) => {
    setHoverCard("https://i.stack.imgur.com/Vkq2a.png");
  };

  const getManaCalculations = (cards) => {
    // setIncludedCards(cards);
    const qtyToSet = cards.reduce((qty, card) => qty + card.quantity, 0);
    setQuantity(qtyToSet);
    const parsedCards = parseCards(cards);
    setIncludedCards(parsedCards);
    const devotion = getDevotion(parsedCards);
    setDevotion(devotion);
    const featuredCard = cards.filter(
      (featured) => featured.is_featured === true
    );
    const parsedFeaturedCard = featuredCard.map((fCard) =>
      JSON.parse(fCard.api_data)
    );
    const featuredUri = parsedFeaturedCard.map(
      (fUri) => fUri.image_uris.normal
    );
    setFeaturedUri(featuredUri);
    const cmc = getCmc(parsedCards);
    setCmc(cmc);
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

  const getDevotion = (cards) => {
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
        devotion.Gray += card.jsonData.cmc;
      }

      for (let index = 0; index < card.jsonData.mana_cost.length; index++) {
        const element = card.jsonData.mana_cost[index];
        if (element.includes("{") || element.includes("}")) {
        } else {
          if (element === "W") {
            devotion.White += 1 * card.quantity;
          }
          if (element === "U") {
            devotion.Blue += 1 * card.quantity;
          }
          if (element === "B") {
            devotion.Black += 1 * card.quantity;
          }
          if (element === "R") {
            devotion.Red += 1 * card.quantity;
          }
          if (element === "G") {
            devotion.Green += 1 * card.quantity;
          }
        }
      }
    });
    return devotion;
  };

  const getCmc = (cards) => {
    var convertedManaCosts = [];
    cards.forEach((card) => {
      if (!card.jsonData.type_line.includes("Land")) {
        const cmc = card.jsonData.cmc;
        convertedManaCosts.push(cmc);
      }
    });
    getAverage(convertedManaCosts);
    var map = convertedManaCosts.reduce(function (previous, current) {
      {
        previous[current] = (previous[current] || 0) + 1;
      }
      return previous;
    }, []);
    return map;
  };

  const getAverage = (costs) => {
    var total = 0;
    for (var i = 0; i < costs.length; i++) {
      total += costs[i];
    }
    var avg = total / costs.length;
    setAverageCmc(avg.toFixed(2));
  };

//   console.log(includedCards);

  return (
    <div>
      <h1 className="editDeckHeader">
        Viewing {selectedDeck.deckname} from {user.username}
      </h1>

      <div>
        <img
          className="featuredViewDeckCard"
          src={hoverCard}
          width="200px"
          height="280"
        />
      </div>

      <div className="ViewDeckMainTable">
        <br />
        <h4 className="editDeckHeader">Total Cards: {quantity}</h4>

        <table>
          <thead>
            <tr>
              <th className="nameTh">Quantity</th>
              <th className="nameTh">Name</th>
              <th className="typeTh">Type</th>
              <th>Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {includedCards.map((card) => (
              <tr key={card.id}>
                <td className="qtyTd">x {card.quantity}</td>
                <td
                  className="nameTd"
                  onMouseOver={() => setDisplayCard(card)}
                  onMouseLeave={() => removeDisplayCard(card)}
                >
                  {card.name}
                </td>
                {/* .split("/")[2] */}
                <td className="typeTd">{card.jsonData.type_line.split("—")[0]}</td>
                <td className="qtyTd">{card.jsonData.prices.usd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />

      <div className="viewDeckFeaturedCardDiv">
        <h2>Featured Card</h2>
        <br />
        <div className="cardImg">
          <img src={featuredUri} width="50%" height="50%" />
          <br />
          <button onClick={() => NavToEditDeck(selectedDeck)}>Edit Deck</button>
        </div>
      </div>
      <br />
      <br />

      <div className="cmcdevotion">
        <div className="deckStats">
          <h1>Total Cards: {quantity}</h1>
          <h1>Devotion</h1>
          <h3>
            White Symbols: {devotion.White}
            <br />
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

        <div className="cmcDiv">
          <h1>Average CMC: </h1>
          <h1>{averageCmc}</h1>
          <table className="cmcTable">
            <thead>
              <tr>
                <th>CMC</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cmc.map((cost, index) => (
                <tr key={index}>
                  <td className="qtyTd"> {index} Drops:</td>
                  <td className="nameTd"> x {cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="descriptionDiv">
          <h1>Description:</h1>
          <textarea
            className="descriptionInput"
            placeholder="Deck Description"
            defaultValue={selectedDeck.description}
          ></textarea>
          <br />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedDeck: state.selectedDeck,
  user: state.user,
  cardList: state.cardList,
});

export default connect(mapStateToProps)(ViewDeck);
