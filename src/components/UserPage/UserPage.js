import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
// const mtg = require('mtgsdk')

class UserPage extends Component {
  
  state ={
    profile: {
      defaultPic: this.props.store.user.img_url
    }
  }

  createDeck=()=>{
    console.log('click');
    var txt;
    var deck = prompt("Please enter a deck name:", "My Awesome Deck");
    if (deck === null || deck === "") {
      txt = "Canceled";
      alert(txt)
      return
    } 
    else {
      txt = deck;
      console.log(txt);
      this.props.dispatch({
        type: 'CREATE_DECK',
        payload: {
          userid: this.props.store.user.id,
          deckname: txt,
          ispublic: false,
          description: "",
          decklist: '',
          featured_card: '',
          upvotes: 0,
          comments: ''

        },
      });

    }
    // this.props.history.push('/editdeck')   //NEED TO REFERENCE NEWLY CREATED DECK 

  }
  editProfile=()=>{
  console.log('clicked');
  this.props.history.push('/edituser')
  }

  editDeck=(deck)=>{
    console.log('in edit deck with:', deck);
    this.props.dispatch({
      type: 'SET_SELECTEDDECK',
      payload: deck
    })
    this.props.history.push('/editdeck')

  }

  viewDeck=(deck)=>{
    console.log('in view deck with:', deck);
    this.props.history.push('/viewdeck')

  }

  deleteDeck=(deck)=>{
    console.log('in delete deck with:', deck);
    var r = window.confirm(`Are you sure you want to permanenently delete this deck?`)
    if (r === true){
        this.props.dispatch({
        type: 'DELETE_DECK',
        payload: deck
        })
      } else {
      return;
    }
  }
    
   
    
  



  render() {
    return (
      <div>
        <img id='profilePic' height='130px' width='130px' src={this.state.profile.defaultPic}></img>
          <div id='profileInfo'>
            <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
            <button onClick={this.editProfile}>Edit Profile</button>
          </div>
        {/* <p>Your ID is: {this.props.store.user.id}</p> */}
        <hr/>

        <div id="mainDiv">
          <div id="userDiv">
            <h1>{this.props.store.user.username}'s Decks</h1>
            <br/>
            <button onClick={this.createDeck}>Create New Deck</button>
            <hr/>
            
            
            <div id="userDeckScroll">
              {this.props.store.deck.map((deck) =>  
                <div key={deck.id}>

                  <h4 id="deckName" onClick={() => this.viewDeck(deck)}>{deck.deckname}</h4>
                  <h5 id="upvotes">Upvotes: {deck.upvotes}</h5>
                  <button onClick={() => this.editDeck(deck)}>EDIT</button>
                  <button onClick={() => this.deleteDeck(deck.id)}>DELETE</button>
                  <hr/>

                </div>  
              )}
            </div>          {/* <p id="demo"></p> */}
            
          </div>

          <div id="userDiv">
          <h1>{this.props.store.user.username}'s Friends</h1>
          <textarea></textarea>
          </div>
        </div>
        <br/>


        {/* <LogOutButton className="log-in" /> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
