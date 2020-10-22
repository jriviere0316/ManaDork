import { card } from 'mtgsdk';
import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



class ViewDeck extends Component {

    state = {
        hoverCard: 'https://i.stack.imgur.com/Vkq2a.png', 
        updatedQty: ''
    }

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_USER' });
        // this.props.dispatch({ type: 'GET_DECK' });
        this.props.dispatch({ 
            type: 'GET_LIST', 
            payload: this.props.reduxStore.selectedDeck.id
        });
        
    }

    editDeck=(deck)=>{
        console.log('in edit deck with:', deck);
        // this.props.dispatch({
        //   type: 'SET_SELECTEDDECK',
        //   payload: deck
        // })
        this.props.history.push('/editdeck')
    }

    cardDisplay=(card)=>{
        console.log('hovering on', card.name, card, card.api_data);
       var parsedData= JSON.parse(card.api_data)
    //    console.log(parsedData.image_uris.normal);


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
    
    // placeDiv(x_pos, y_pos) {
    //     var d = document.getElementById('yourDivId');
    //     d.style.position = "absolute";
    //     d.style.left = x_pos+'px';
    //     d.style.top = y_pos+'px';
    //   }

    render(){
        // console.log('recentCard state:',this.state.recentCard);
        const includedCards = this.props.reduxStore.cardList.filter(card => card.deckid === this.props.reduxStore.selectedDeck.id);
        console.log('includedCards:', includedCards);
        const featuredCard = includedCards.filter(featured => featured.is_featured === true)
        const mappedFeaturedCard = featuredCard.map(fCard => JSON.parse(fCard.api_data))
        const featuredUri = mappedFeaturedCard.map(fUri => fUri.image_uris.normal)
        return (
                
            <div >

<h1 id="editDeckHeader">Viewing {this.props.reduxStore.selectedDeck.deckname} from {this.props.reduxStore.user.username} </h1>
            
                
                
                <div id="viewDeckEditDeckView" > 
                <div>
                <img  id="featuredViewDeckCard" src={this.state.hoverCard} width="200px" height="280"/> 
                </div>
                <br/>  
                    <table >
                        <thead>
                            <tr>
                                <th></th>
                                {/* Hovercard^ */}
                                <th>Quantity</th>
                                <th id="nameTh">Card Name</th>
                                {/* <th>isCMDR?</th> */}
                                <th></th>
                                {/* isFeatured? */}
                                <th></th>
                                {/* Type */}
                                {/* <th>DELETE</th> */}

                            </tr>
                        </thead>
                        <tbody>

                            {includedCards.map((card) =>  
                            <tr key={card.id}>
                                <td></td>
                                {/* //hovercard^ */}
                                <td id="qtyTd">x {card.quantity}</td>
                                <td id="nameTd" onMouseOver={()=>this.cardDisplay(card)} onMouseLeave={()=>this.removeDisplay(card)}>{card.name}</td>
                                
                                {/* <td>{card.is_cmdr}</td> */}
                                <td>{card.is_featured}</td>
                                <td></td>
                            </tr>
                            )}

                        </tbody>
                        {/* ////////////////////////////////////////////////////// */}
                        

                    </table>
                </div>



                <br/>




                <div id="viewDeckFeaturedCardDiv">
                    <h2>Featured Card</h2><br/>
                    <div id="cardImg">
                        <img src={featuredUri} width='50%' height='50%'/>
                        <br/>
                        <button onClick={() => this.editDeck(this.props.reduxStore.selectedDeck)}>Edit Deck</button>      

                    </div>

                </div>
                <br/>          
                <br/>                   




                {/* <h5 id="upvotes">Upvotes: {this.props.reduxStore.selectedDeck.upvotes}</h5>
                <hr/> */}
                
                <div id="descriptionDiv">
                    <h2 id="descriptionDivText">Description:</h2>
                    <textarea id="descriptionInput" placeholder="Deck Description"  value={this.props.reduxStore.selectedDeck.description} ></textarea>
                    <br/>
                </div>
            </div>);
    }
}

const mapStateToProps = (reduxStore) => ({
reduxStore
})

export default connect(mapStateToProps)(ViewDeck);
