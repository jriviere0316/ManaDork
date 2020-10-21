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


    render(){
        // console.log('recentCard state:',this.state.recentCard);
        const includedCards = this.props.reduxStore.cardList.filter(card => card.deckid === this.props.reduxStore.selectedDeck.id);
        console.log('includedCards:', includedCards);
        const featuredCard = includedCards.filter(featured => featured.is_featured === true)
        const mappedFeaturedCard = featuredCard.map(fCard => JSON.parse(fCard.api_data))
        const featuredUri = mappedFeaturedCard.map(fUri => fUri.image_uris.normal)
        return (
                
            <div >
                <div id="editDeckView">   
                    <table >
                        <thead>
                            <tr>
                                <th>Hovercard</th>
                                <th>Quantity</th>
                                <th>Card Name</th>
                                {/* <th>isCMDR?</th> */}
                                <th>isFeatured?</th>
                                <th>Type</th>
                                {/* <th>DELETE</th> */}

                            </tr>
                        </thead>
                        <tbody>

                            {includedCards.map((card) =>  
                            <tr key={card.id}>
                                <td>hoverCard</td>
                                <td>x {card.quantity}</td>
                                <td onMouseOver={()=>this.cardDisplay(card)} onMouseLeave={()=>this.removeDisplay(card)}>{card.name}</td>
                                
                                {/* <td>{card.is_cmdr}</td> */}
                                <td>{card.is_featured}</td>
                                <td></td>
                            </tr>
                            )}

                        </tbody>
                        {/* ////////////////////////////////////////////////////// */}
                        
                    </table>
                </div>




                <h2>Viewing {this.props.reduxStore.selectedDeck.deckname} from {this.props.reduxStore.user.username} </h2>
                <div id="featuredCardDiv">
                    <h2>Featured Card</h2><br/>
                    <div id="cardImg">
                        <img src={featuredUri} width='50%' height='50%'/>
                    </div>
                </div>
                <br/>          
                <img src={this.state.hoverCard} width="200px" height="280"/> 





                <h5 id="upvotes">Upvotes: {this.props.reduxStore.selectedDeck.upvotes}</h5>
                <button onClick={() => this.editDeck(this.props.reduxStore.selectedDeck)}>EDIT</button>      
                <hr/>
                
                <p>
                    Description: {this.props.reduxStore.selectedDeck.description}
                </p>
            </div>);
    }
}

const mapStateToProps = (reduxStore) => ({
reduxStore
})

export default connect(mapStateToProps)(ViewDeck);
