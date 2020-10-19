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
        selectedCard: '',
        qtyInput: 1,
        isPublic: this.props.reduxStore.selectedDeck.ispublic
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

    handleQtyInput=(event)=>{
        console.log('qty event:', event.target.value);

        this.setState({
            qtyInput: event.target.value
        })
    }
      

    test=()=>{
        console.log('in test:', this.state.cardSearchInput);
        
    this.props.dispatch({
        type: 'FETCH_CARD',
        payload: this.state.cardSearchInput
    })
    }
    
    addToDeck=()=>{
        console.log('in add to deck');
        this.props.dispatch({
            type: 'ADD_LISTITEM',
            payload: {
                name: this.state.selectedCard.name,
                quantity: this.state.qtyInput,
                is_cmdr: 'false',
                is_featured: 'false',
                api_data: this.state.selectedCard,
                deckid: this.props.reduxStore.selectedDeck.id,
                comboid: ''
                
            }
            //"card_item" ("id", "name", "quantity", "is_cmdr", "is_featured", "api_data", "deckid", "comboid")
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
            if(option.image_uris === undefined){
                this.setState({
                hoverCard: `https://s3.thingpic.com/images/Kz/uF3amfCnYFLBggjUNr1sPRKi.jpeg`
            })
            }else{
                this.setState({
                hoverCard: option.image_uris.normal
            })
        }
    }


    handleRadio() {
        console.log('in handle radio');
        }

    render(){
        console.log('recentCard state:',this.state.recentCard);
        console.log('redux state of cards:', this.props.reduxStore.card);
        console.log('state of cards at [0]', this.props.reduxStore.card[0]);
        console.log('selected deck:', this.props.reduxStore.selectedDeck);
        console.log('hoverCard:', this.state.hoverCard);
        console.log('selectedCard:', this.state.selectedCard.name, this.state.selectedCard);
        console.log(this.state.isPublic);
        console.log('qtyInput:', this.state.qtyInput);
        return (
                
            <div>

                <div>

                    <h1 id="editDeckHeader">Editing: {this.props.reduxStore.selectedDeck.deckname}</h1>
                </div>
                
                <div id="descriptionDiv">
            
                    <input id="deckName" placeholder="Deck Name" defaultValue={this.props.reduxStore.selectedDeck.deckname}></input>
                
                {this.state.isPublic === false ?
                    <>
                        <form onChange={this.handleRadio} >       
                            <label htmlFor="isPublic" >Public</label>
                            <input type="radio" name='publicstatus' id="isPublic" value="true" ></input>
                            <label htmlFor="isPrivate">Private</label>
                            <input type="radio" name='publicstatus' id="isPublic" value="false" defaultChecked  ></input>
                        </form>
                    </>
                    :
                    <>
                        <form onChange={this.handleRadio} >       
                            <label htmlFor="isPublic" >Public</label>
                            <input type="radio" name='publicstatus' id="isPublic" value="true" defaultChecked></input>
                            <label htmlFor="isPrivate">Private</label>
                            <input type="radio" name='publicstatus' id="isPublic" value="false"></input>
                        </form>
                    </>
                            
                
                
                }
                   

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

                        

                        <input type="number" placeholder="Quantity" defaultValue="1" defaultValue={this.state.qtyInput} onChange={this.handleQtyInput}></input><br/>
                        <button onClick={this.addToDeck}> * Add To Deck * </button><br/>
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
