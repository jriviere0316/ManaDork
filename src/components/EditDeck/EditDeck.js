import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// const mtg = require('mtgsdk')
// var scryfallSdk = require("scryfall-sdk")

class EditDeck extends Component {

    state = {
        cardSearchInput: '',
        recentCard: ''
    }
    // test=()=>{
    //     mtg.card.find(3)
    //     .then(result => {
    //         console.log(result.card.imageUrl) // "Black Lotus"
    //     })
    // }

    handleSearchInput=(event)=>{
        console.log('event:', event.target.value);
          this.setState({
            cardSearchInput: event.target.value
        })
      }
      



    test=()=>{
        console.log('in test:', this.state.cardSearchInput);
        
    this.props.dispatch({
        type: 'FETCH_CARD',
        payload: this.state.cardSearchInput
    })
    }


    saveAndNav=()=>{
        console.log('in saveAndNav');
        this.props.history.push('/viewdeck')
    }

    saveAndStay=()=>{
        console.log('in saveAndStay');
    }
    


    render(){
        console.log('recentCard state:',this.state.recentCard);
        console.log('redux state of cards:', this.props.reduxStore.card);
        console.log(this.props.reduxStore.card[0]);
        return (
                
                <div >

                    <div>

                        <h1>EDIT DECK PAGE</h1>
                    </div>
                    
                    <div id="descriptionDiv">
                    <form>

                        <input id="deckName" placeholder="Deck Name"></input>
                            <label htmlFor="isPublic">Public</label>
                            <input type="radio" name='publicstatus' id="isPublic" value="public"></input>
                            <label htmlFor="isPrivate">Private</label>
                            <input type="radio" name='publicstatus' id="isPrivate" value="private"></input>
                        </form>
                        <br/>
                        <textarea id="descriptionInput" placeholder="Deck Description"></textarea>
                        <br/>
                        <button onClick={this.saveAndNav}>Save</button>
                        <button onClick={this.saveAndStay}>Save and Continue Editing</button>
                    </div>
                        
                    <br/>    
                    <div>
                        {/* <h1>{this.props.reduxStore.card}</h1> */}
                        <form id="cardInputForm">
                            <img src={this.props.reduxStore.card[0].image_uris.normal} alt='Card Display'width='215px' height='300px'/>
                            <br/>
                            <input placeholder="Card Name" onChange={this.handleSearchInput}></input>
                            <br/>
                            <input placeholder="Quantity"></input><br/>
                            <button onClick={this.test}> * Add To Deck * </button><br/>
                            <label htmlFor="isCmdrinput">Is this your commander?</label><br/>
                            <input type="checkbox" id="isCmdrinput" value="Commander"></input><br/>
                            <button onClick={this.saveAndNav}>Save</button>
                            <button onClick={this.saveAndStay}>Save and Continue Editing</button><br/>
                        </form>
                    </div>
                    
                    <br/>

                    <div id="featuredCardDiv">
                        <div id="cardImg">
                            {/* <img src={this.state.recentCard.imageUrl} width='215px' height='320px'/> */}
                        </div>
                        <input placeholder="Select Featured Card"></input>
                        <br/>
                        <button onClick={this.saveAndNav}>Save</button>
                        <button onClick={this.saveAndStay}>Save and Continue Editing</button>
                    </div>


                    {/* <div id="cardImg">
                        <img src={this.state.recentCard.imageUrl}>
                        </img>
                    </div> */}


                    <div id="listDisplay">
                        <h1>List Display</h1>
                        <textarea id="listDisplayTextArea">

                        </textarea><br/>
                        <button id="deleteDeckBtn">Delete Deck</button>

                    </div>



                    



                </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(EditDeck);
