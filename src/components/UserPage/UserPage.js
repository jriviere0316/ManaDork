import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  friends: state.friendsReducer,
  decks: state.deck,
  ...ownProps,
});

const UserPageFunc = ({
  decks,
  dispatch,
  friends,
  history,
  user,
}) => {
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'GET_DECK' });
    dispatch({ type: 'GET_FRIENDS' });
  }, [dispatch])

  const createDeck = () => {
    const deck = prompt("Please enter a deck name:", "My Awesome Deck");
    if (deck === null || deck === "") {
      alert("Canceled");
    } else {
      this.props.dispatch({
        type: 'CREATE_DECK',
        payload: {
          userid: user.id,
          deckname: deck,
          ispublic: false,
          description: "",
          decklist: '',
          featured_card: '',
          upvotes: 0,
          comments: '',
        },
      });
    };
  };

  const deleteDeck = (deck) => {
    const response = window
      .confirm(`Are you sure you want to permanenently delete this deck?`);
    if (response) {
      this.props.dispatch({
        type: 'DELETE_DECK',
        payload: deck,
      })
    }
  };

  return (
    <div id='userMainDiv'>
      <img id='profilePic' height='130px' width='130px' src={user.img_url} />
      <div id='profileInfo'>
        <h1 id='welcome'>
          Welcome, {user.username}!
        </h1>
        <button onClick={() => history.push('/edituser')}>
          Edit Profile
        </button>
      </div>
      <hr />
      <div id='mainDiv'>
        <div id='userDiv'>
          <h1>
            {user.username}'s Decks
          </h1>
          <br/>
          <button onClick={createDeck}>
            Create New Deck
          </button>
          <hr/>
          <div id='userDeckScroll'>
            {decks.map((deck) =>
              <div id='deckOptions' key={deck.id}>
                <h4 id='deckName' onClick={() => history.push(`/viewdeck/${deck.id}`)}>
                  {deck.deckname}
                </h4>
                <h5 id='upvotes'>
                  Upvotes: {deck.upvotes}
                </h5>
                <button onClick={() => history.push(`/editdeck/${deck.id}`)}>
                  EDIT
                </button>
                <button onClick={() => deleteDeck(deck.id)}>
                  DELETE
                </button>
                <br/>
              </div>
            )}
          </div>
        </div>
        <div id='userDiv'>
          <h1>
            {user.username}'s Friends
          </h1>
          <br/>
          <button onClick={() => console.log('this.viewUsers?')}>
            View/Search Users
          </button>
          <hr/>
          <div id='friendsDeckScroll'>
            {friends
              .filter(f => f.id !== user.id)
              .map((friend) =>
                <div id='friendOptions' key={friend.id}>
                  <h4 id='deckName'>
                    {friend.username}
                  </h4>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <br/>
    </div>
  );
};

const UserPageFuncExport = connect(mapStateToProps)(UserPageFunc);
export { UserPageFuncExport };

class UserPage extends Component {

  state ={
    profile: {
      defaultPic: this.props.store.user.img_url
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_DECK' });
    this.props.dispatch({ type: 'GET_FRIENDS' });
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
    this.props.dispatch({
      type: 'SET_SELECTEDDECK',
      payload: deck
    })
    this.props.history.push('/viewdeck')
  }

  deleteDeck=(deck)=>{
    console.log('in delete deck with:', deck);
    var r = window.confirm(`Are you sure you want to permanenently delete this deck? `)
    //https://cdn.cardsrealm.com/images/cartas/crop/m13-magic-2013/door-to-nothingness-203-min.jpeg?1578
    if (r === true){
        this.props.dispatch({
        type: 'DELETE_DECK',
        payload: deck
        })
      } else {
      return;
    }
  }

  viewFriend=(friend)=>{
    console.log('in view friend with:', friend);
  }



  render() {

    const friendsList = this.props.store.friendsReducer.filter(user => user.id !== this.props.store.user.id);
    console.log('friendsList:', friendsList);
    console.log('store', this.props.store);
    return (
      <div id="userMainDiv">
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
                <div id="deckOptions"key={deck.id}>

                  <h4 id="deckName" onClick={() => this.viewDeck(deck)}>{deck.deckname}</h4>
                  <h5 id="upvotes">Upvotes: {deck.upvotes}</h5>
                  <button onClick={() => this.editDeck(deck)}>EDIT</button>
                  <button onClick={() => this.deleteDeck(deck.id)}>DELETE</button>
                  <br/>

                </div>
              )}
            </div>

          </div>
            {/* ////////////// FRIENDS SCROLL BOX ////////////// */}
          <div id="userDiv">
          <h1>{this.props.store.user.username}'s Friends</h1>
          <br/>
            <button onClick={this.viewUsers}>View/Search Users</button>
            <hr/>
            <div id="friendsDeckScroll">
              {friendsList.map((friend) =>
                <div id="friendOptions" key={friend.id}>

                  <h4 id="deckName" onClick={() => this.viewFriend(friend)}>{friend.username}</h4>


                </div>
              )}
            </div>
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
