import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Swal from 'sweetalert2'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserHub(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
    const [heading, setHeading] = useState('User Hub w/ Hooks');
    //const [user, setUser] = useState('')


    //"STATE" STUFF
  useEffect( () => {
    console.log('in useEffect');
    props.dispatch({ type: 'GET_FRIENDS' });
    //checkTaskMap(); 
    },[state])

    const [state, setState] = React.useState({

    });



    //FUNCTIONS
    const createDeck = () => {
        console.log('in createDeck');
    }
    const viewDeck = (deck) => {
        console.log('in viewDeck with:', deck);
        props.history.push(`viewdeck/${deck}`)
    }
    const editDeck = (deck) => {
        console.log('in editDeck with:', deck);
        props.history.push(`editdeck/${deck}`)

    }
    const deleteDeck = (deck) => {
        console.log('in delete deck with:', deck);
        //var r = window.confirm(`Are you sure you want to permanenently delete this deck? `)
        //Swal.fire(`Are you sure you want to permanenently delete this deck? `)
        Swal.fire({
            title: 'Are you sure?',
            imageUrl: `https://cdn.cardsrealm.com/images/cartas/crop/m13-magic-2013/door-to-nothingness-203-min.jpeg?1578`,
            text: 'You will not be able to recover this deck after confirming!',
            //icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                
                props.dispatch({
                    type: 'DELETE_DECK',
                    payload: deck
                })

                Swal.fire(
                'Deleted!',
                'Your deck has been deleted.',
                'success'
              )


            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your deck is safe! :)',
                'error'
              )
            }
          })
        
        //https://cdn.cardsrealm.com/images/cartas/crop/m13-magic-2013/door-to-nothingness-203-min.jpeg?1578
        // if (r === true){
        //     props.dispatch({
        //     type: 'DELETE_DECK',
        //     payload: deck
        //     })
        //   } else {
        //   return;
        // }    
    }
    const viewUsers = () => {
        console.log('in viewUsers');
    }
    const viewFriend = (friend) => {
        console.log('in viewFriend with:', friend);
    }

    const friendsList = props.store.friendsReducer.filter(user => user.id !== props.store.user.id);
    console.log('friendsList is', friendsList);


  return (
    <div>
      <h2>{heading}</h2>
      <h2>Hello {props.store.user.username} </h2>
      
        <div id="mainDiv">
            <div id="userDiv">
                <h1>{props.store.user.username}'s Decks</h1>
                <br/>
                <button onClick={createDeck}>Create New Deck</button>
                <hr/>
                
                
                <div id="userDeckScroll">
                {props.store.deck.map((deck) =>  
                    <div id="deckOptions"key={deck.id}>

                    <h4 id="deckName" onClick={() => viewDeck(deck.id)}>{deck.deckname}</h4>
                    <h5 id="upvotes">Upvotes: {deck.upvotes}</h5>
                    <button onClick={() => editDeck(deck.id)}>EDIT</button>
                    <button onClick={() => deleteDeck(deck.id)}>DELETE</button>
                    
                    <br/>

                    </div>  
                )}
                </div>          
            
            </div>


          {/* ////////////// FRIENDS SCROLL BOX ////////////// */}
          
          <div id="userDiv">
          <h1>{props.store.user.username}'s Friends</h1>
          <br/>
            <button onClick={viewUsers}>View/Search Users</button>
            <hr/>
            <div id="friendsDeckScroll">
              {friendsList.map((friend) =>  
                <div id="friendOptions" key={friend.id}>

                  <h4 id="deckName" onClick={() => viewFriend(friend)}>{friend.username}</h4>

                </div>  
              )}
            </div>  
          </div>
        </div>
    </div>
  );
}

export default connect(mapStoreToProps)(UserHub);