import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// const mtg = require('mtgsdk')
// var scryfallSdk = require("scryfall-sdk")

class EditDeck extends Component {

    state = {
        cardSearchInput: [],
        featuredCard: '',
        recentCard: '',
        hoverCard: '',
        selectedCard: ''
    }
 

    handleSearchInput=(event)=>{
        console.log('event:', event.target.value);
          this.setState({
            cardSearchInput: event.target.value
        })
        if (this.state.cardSearchInput.length >= 2){
            this.test();
        }
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
    

    selectOption=(option)=>{
        console.log('selectOption SELECTED:', option.name, option);
        this.setState({
            selectedCard: option,
            cardSearchInput: []
        })

    }

    updateSearchImage=(option)=>{
        console.log('in updateSearchImage with:', option.name);
        this.setState({
            hoverCard: option.image_uris.normal
        })
    }

    render(){
        console.log('recentCard state:',this.state.recentCard);
        console.log('redux state of cards:', this.props.reduxStore.card);
        console.log('state of cards at [0]', this.props.reduxStore.card[0]);
        console.log('selected deck:', this.props.reduxStore.selectedDeck);
        console.log('hoverCard:', this.state.hoverCard);
        console.log('selectedCard:', this.state.selectedCard.name, this.state.selectedCard);
        return (
                
            <div>

                <div>

                    <h1 id="editDeckHeader">Editing: {this.props.reduxStore.selectedDeck.deckname}</h1>
                </div>
                
                <div id="descriptionDiv">
                


                    <input id="deckName" placeholder="Deck Name" defaultValue={this.props.reduxStore.selectedDeck.deckname}></input>
                
                
                        <form value={this.props.reduxStore.selectedDeck.ispublic}>       
                        <label htmlFor="isPublic" >Public</label>
                        <input type="radio" name='publicstatus' id="isPublic" value="public"></input>
                        <label htmlFor="isPrivate">Private</label>
                        <input type="radio" name='publicstatus' id="isPrivate" value="private"></input>
                    </form>
                    <br/>
                    <textarea id="descriptionInput" placeholder="Deck Description" defaultValue={this.props.reduxStore.selectedDeck.description}></textarea>
                    <br/>
                    <button onClick={this.saveAndNav}>Save</button>
                    <button onClick={this.saveAndStay}>Save and Continue Editing</button>
                </div>
                    
                <br/>    
                <div>
                    {/* <h1>{this.props.reduxStore.card}</h1> */}
                    <form id="cardInputForm">

                        {this.state.hoverCard.length >= 1 ?
                            <>
                                <img src={this.state.hoverCard} alt='Card Display' width='215px' height='300px'/>
                            </>
                            :
                            <>
                                <img src={this.props.reduxStore.card[0].image_uris.normal} 
                                alt='Card Display' width='215px' height='300px'/>
                            </>
                        }
                        
                        
                        <br/>
                            <input id="cardSearchInput" placeholder="Card Name" onChange={this.handleSearchInput}></input>
                        <br/>

                        {this.state.cardSearchInput.length >= 1 ?
                            <div id="optionsDiv">
                                <ul id="cardOptions">
                                    {this.props.reduxStore.card.map((option) =>  
                                        <li key={option.id} value={option} id="optionLi" onMouseOver={()=>this.updateSearchImage(option)} onClick={()=>this.selectOption(option)}>{option.name}</li>  
                                    )}
                                </ul>
                            </div>:
                            <>
                            </>
                        }  

                        

                        <input type="number" placeholder="Quantity" defaultValue="1"></input><br/>
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
                        <img src={this.props.reduxStore.selectedDeck.featured_card} width='50%' height='50%'/>
                    </div>
                    <input id="featuredCardInput" placeholder="Select Featured Card"></input>
                    <br/>
                    <button onClick={this.saveAndNav}>Save</button>
                    <button onClick={this.saveAndStay}>Save and Continue Editing</button>
                </div>


                {/* <div id="cardImg">
                    <img src={this.state.recentCard.imageUrl}>
                    </img>
                </div> */}


                {/* <div id="listDisplay">
                    <h1>List Display</h1>
                    <textarea id="listDisplayTextArea">

                    </textarea><br/>
                    <button id="deleteDeckBtn">Delete Deck</button>

                </div> */}



                



            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(EditDeck);
