import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
// const mtg = require('mtgsdk')

class UserPage extends Component {
  
  createDeck=()=>{
    console.log('click');
    var txt;
    var deck = prompt("Please enter a deck name:", "My Awesome Deck");
    if (deck == null || deck == "") {
      txt = "Canceled";
      alert(txt)
      return
    } else {
      txt = deck;
      this.props.history.push('/editdeck')
    }
    document.getElementById("demo").innerHTML = txt;
  //   mtg.card.all({ name: `${this.state.cardSearchInput}`, pageSize: 1 })
  //   .on('data', card => {
  //       console.log(card)
  //   this.setState({
  //       recentCard: card
  //   })
  // })
}
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>

        <div id="mainDiv">
          <div id="userDiv">
          <h1>{this.props.store.user.username}'s Decks</h1>
          <br/>
          <button onClick={this.createDeck}>Create New Deck</button>
          <br/>
          <textarea></textarea>
          <p id="demo"></p>

          </div>

          <div id="userDiv">
          <h1>{this.props.store.user.username}'s Friends</h1>
          <textarea></textarea>
          </div>
        </div>
<br/>


        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
