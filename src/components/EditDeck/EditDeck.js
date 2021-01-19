import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// const mtg = require('mtgsdk')
// var scryfallSdk = require("scryfall-sdk")

class EditDeck extends Component {

    state = {
        cardSearchInput: '',
        featuredCard: '',
        recentCard: '',
        hoverCard: 'https://i.stack.imgur.com/Vkq2a.png',
        selectedCard: {},
        qtyInput: 1,
        isPublic: this.props.reduxStore.selectedDeck.ispublic,
        deckname: this.props.reduxStore.selectedDeck.deckname,
        description: this.props.reduxStore.selectedDeck.description,
        defaultSearch: ''

    }
    componentDidMount() {
        this.props.dispatch({ 
            type: 'GET_LIST', 
            payload: this.props.reduxStore.selectedDeck.id
        });

        console.log('dispatching selected deck');
        this.props.dispatch({
            type: 'GET_SELECTED_DECK',
            payload: this.props.history.location.pathname.split("/")[2]
        })
    }
    handleFeatured=(card)=>{
        console.log('in handle featured', card.id);
        card.is_featured = !card.is_featured
        console.log('updated featured status:', card.is_featured);
        this.props.dispatch({
            type: 'EDIT_LISTITEM',
            payload: card
        })
    }
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [ propertyName ]: event.target.value
        })
    }

    cardDisplay=(card)=>{
        console.log('hovering on', card.name, card, card.api_data);
        var parsedData= JSON.parse(card.api_data)
        if(parsedData.image_uris === undefined){
        this.setState({
        hoverCard: `https://s3.thingpic.com/images/Kz/uF3amfCnYFLBggjUNr1sPRKi.jpeg`
        })
        }else{
            this.setState({
                hoverCard: parsedData.image_uris.normal
            })
        }
    }

    removeDisplay=(card)=>{
        this.setState({
            hoverCard: 'https://i.stack.imgur.com/Vkq2a.png'
        })
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
        })
        this.setState({
         ...this.state,
         cardSearchInput: [],
         featuredCard: '',
         recentCard: '',
         hoverCard: 'https://i.stack.imgur.com/Vkq2a.png',
         selectedCard: '',
         qtyInput: 1,
         defaultSearch: ''
        })
        // this.props.dispatch({
        //     type: 'UNSET_CARD'
        // })

    }
 

    updateDeckAndNav=()=>{
        console.log('in updateDeckAndNav');
        this.props.dispatch({
            type: 'UPDATE_DECK',
            payload: {
                comments: this.props.reduxStore.selectedDeck.comments,
                decklist: this.props.reduxStore.selectedDeck.decklist,
                deckname: this.state.deckname,
                description: this.state.description,
                featured_card: this.props.reduxStore.selectedDeck.featuredCard,
                ispublic: this.state.isPublic,
                // upvotes: this.props.reduxStore.selectedDeck.upvotes,
                userid: this.props.reduxStore.selectedDeck.userid,
                id: this.props.reduxStore.selectedDeck.id,

            }
        })
        this.props.history.push('/viewdeck')
    }

    viewDeck=()=>{
        this.props.history.push('/viewdeck')
    }

    updateDeck=()=>{
        this.props.dispatch({
            type: 'UPDATE_DECK',
            payload: {
                comments: this.props.reduxStore.selectedDeck.comments,
                decklist: this.props.reduxStore.selectedDeck.decklist,
                deckname: this.state.deckname,
                description: this.state.description,
                featured_card: this.props.reduxStore.selectedDeck.featuredCard,
                ispublic: this.state.isPublic,
                // upvotes: this.props.reduxStore.selectedDeck.upvotes,
                userid: this.props.reduxStore.selectedDeck.userid,
                id: this.props.reduxStore.selectedDeck.id,

            }
        })
        alert(`${this.state.deckname} has been updated!`)
    }
    

    selectOption=(option)=>{
        console.log('selectOption SELECTED:', option.name, option);
        this.setState({
            selectedCard: option,
            cardSearchInput: option.name
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
    removeDisplay=(option)=>{
        // console.log('left:', card.name, card, card.api_data);
        this.setState({
            hoverCard: 'https://i.stack.imgur.com/Vkq2a.png'
        })
    }

    qtyDown=(card)=>{
        console.log('clicked -', card.name, card.quantity, card);
        console.log('this cards qty is:', card.quantity);
        let qtyLess = card.quantity -= 1;
        console.log(qtyLess);
        this.props.dispatch({
            type: 'EDIT_LISTITEM',
            payload: card
        })
    }
    
    qtyUp=(card)=>{
        console.log('clicked + on: ', card.name, card);
        console.log('this cards qty is:', card.quantity);
        let qtyMore = card.quantity += 1;
        console.log(qtyMore);
        this.props.dispatch({
            type: 'EDIT_LISTITEM',
            payload: card
        })
    }

    deleteCard=(card)=>{
        console.log('clicked delete on:', card.name);
        this.props.dispatch({
            type: 'DELETE_LISTITEM',
            payload: card
        })
    }


    handleRadio() {
        console.log('in handle radio');
    }

        

    render(){
        console.log('recentCard state:',this.state.recentCard);
        console.log('redux state of cards:', this.props.reduxStore.card);
        console.log('state of cards at [0]', this.props.reduxStore.card[0]);
        console.log('selected deck:', this.props.reduxStore.selectedDeck);
        // console.log('hoverCard:', this.state.hoverCard);
        // console.log('selectedCard:', this.state.selectedCard.name, this.state.selectedCard);
        // console.log(this.state.isPublic);
        // console.log('qtyInput:', this.state.qtyInput);

        const includedCards = this.props.reduxStore.cardList.filter(card => card.deckid === this.props.reduxStore.selectedDeck.id);
        const featuredCard = includedCards.filter(featured => featured.is_featured === true)
        const mappedFeaturedCard = featuredCard.map(fCard => JSON.parse(fCard.api_data))
        const featuredUri = mappedFeaturedCard.map(fUri => fUri.image_uris.normal)
        // console.log('mappedFeaturedCard is:', mappedFeaturedCard);
        // console.log('mappedFeaturedCard image uri is:', mappedFeaturedCard.artist);
        // console.log('featuredUri:', featuredUri);

        // console.log('description:', this.state.description);
        console.log('state is:', this.state);

        return (
                
            <div>

                <div>

                    <h1 id="editDeckHeader" >Editing: {this.props.reduxStore.selectedDeck.deckname} </h1>
                </div>
                
                <div id="descriptionDiv">
            {/*                         DECK NAME                     */}
                    <input id="deckName" placeholder="Deck Name" defaultValue={this.props.reduxStore.selectedDeck.deckname} onChange={(event)=>this.handleChange(event, 'deckname')}></input>
                
                {/* {this.state.isPublic === false ?
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
                   
                } */}
                   
                <br/>
            {/*                         DESCRIPTION                    */}

                <textarea id="descriptionInput" placeholder="Deck Description" onChange={(event)=>this.handleChange(event, 'description')} defaultValue={this.props.reduxStore.selectedDeck.description} ></textarea>
                <br/>

                {/* <button onClick={this.saveAndNav}>Save</button> */}
                <button onClick={this.updateDeckAndNav}>Save & View</button>
                <button onClick={this.updateDeck}>Save</button>

                </div>
                    
                <br/> 

                <div id="editDeckView">
                    <table >
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
                                {includedCards.map((card) =>  
                                <tr key={card.id}>
                                    <td id="qtyTd">x {card.quantity}</td>
                                    <td onMouseOver={()=>this.cardDisplay(card)} onMouseLeave={()=>this.removeDisplay(card)}>{card.name}</td>
                                    {/* <td>{card.is_cmdr}</td> */}
                                    <td><input type="checkbox" id="myCheck" defaultValue={card.is_featured} defaultChecked={card.is_featured} onChange={()=>this.handleFeatured(card)} /> </td>
                                    <td><button id="incrementBtn" onClick={()=>this.qtyDown(card)}> - </button><button id="incrementBtn"  onClick={()=>this.qtyUp(card)}>+</button></td>
                                    <td><button onClick={()=>this.deleteCard(card)}>DELETE</button></td>  
                                </tr>
                                )}
                            </tbody>
                        {/* </div> */}
                    </table>
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
                                {/* <img src={this.props.reduxStore.card[0].image_uris.normal} 
                                alt='Card Display' width='215px' height='300px'/> */}
                            </>
                        }
                        <br/>
                            <input id="cardSearchInput" placeholder="Card Name" value={this.state.cardSearchInput} onChange={this.handleSearchInput}></input>
                        <br/>

                        {this.state.cardSearchInput.length >= 1 ?
                            <div id="optionsDiv">
                                <ul id="cardOptions">
                                    {this.props.reduxStore.card.map((option) =>  
                                        <li key={option.id} value={option} id="optionLi" onMouseOver={()=>this.updateSearchImage(option) } onMouseLeave={()=>this.removeDisplay(option)}onClick={()=>this.selectOption(option)}>{option.name}</li>  
                                    )}
                                </ul>
                            </div>:
                            <>
                            </>
                        }  

                        <input type="number" placeholder="Quantity" defaultValue={this.state.qtyInput} onChange={this.handleQtyInput}></input><br/>
                        <button onClick={this.addToDeck}> Add To Deck → </button><br/>
                        {/* <label htmlFor="isCmdrinput">Is this your commander?</label><br/>
                        <input type="checkbox" id="isCmdrinput" value="Commander"></input><br/> */}
                        <button onClick={this.viewDeck}>View Deck</button>
                        {/* <button onClick={this.saveAndStay}>Save and Continue Editing</button><br/> */}
                    </form>
                </div>
                
                <br/>

                <br/>
                <div id="featuredCardDiv">
                    <h2>Featured Card</h2><br/>
                    <div id="cardImg">
                        <img src={featuredUri} width='50%' height='50%'/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(EditDeck);
