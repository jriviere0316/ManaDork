import { card } from 'mtgsdk';
import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { PieChart } from 'react-minimal-pie-chart';



class ViewDeck extends Component {

    state = {
        hoverCard: 'https://i.stack.imgur.com/Vkq2a.png', 
        updatedQty: '',
        deckQty: '',
        parsedCards: []
    }

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_USER' });
        // this.props.dispatch({ type: 'GET_DECK' });
        this.props.dispatch({
            type: 'GET_LIST', 
            payload: this.props.reduxStore.selectedDeck.id
        });
        
        //console.log('dispatching selected deck');
        this.props.dispatch({
            type: 'GET_SELECTED_DECK',
            payload: this.props.history.location.pathname.split("/")[2]
        })
    }

    editDeck=(deck)=>{
        console.log('in edit deck with:', deck);
        // this.props.dispatch({
        //   type: 'SET_SELECTEDDECK',
        //   payload: deck
        // })
        const id = this.props.history.location.pathname.split("/")[2]

        this.props.history.push(`/editdeck/${id}`)
    }

    cardDisplay=(card)=>{
        //console.log('hovering on', card.name, card, card.api_data);
       var parsedData = JSON.parse(card.api_data)
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
    
    countQty=(cards)=>{
        if(cards){
            var qty = 0
            cards.forEach(card => {
                //for each instance of a card, qtyToAdd = card.quantity
                var qtyToAdd = card.quantity
                //console.log('qtyToAdd', qtyToAdd);
                let totalqty = qty + qtyToAdd
                qty = totalqty
                //var totalCards = qty
                //console.log('totalCards', totalCards);
            });

            console.log('new total:',qty);

            if(this.state.deckQty !== qty){
                this.setState({
                    deckQty: qty
                })
            }
        }
    }


    parseCards=(cards)=>{
        var allParsedCards = []
        cards.forEach(card => {
            var parsedCard = JSON.parse(card.api_data)
            allParsedCards.push(parsedCard)
        });
        return(allParsedCards);
    }


    devotion=(cards)=>{
        console.log(cards);
        //var allColors = []
        var allSymbols = []
        var devotion = {
            White: 0,
            Blue: 0,
            Black: 0,
            Red: 0,
            Green: 0,
            Gray: 0
        }

        cards.forEach(card => {
            if (card.colors.length === 0 && card.cmc > 0){
                console.log('colorless card with cmc of', card.cmc);
                devotion.Gray += card.cmc
            }
            
           
            for (let index = 0; index < card.mana_cost.length; index++) {
                const element = card.mana_cost[index];
                if(element.includes('{') || element.includes('}') ){
                    //console.log('this includes a { or }');
                }
                else{
                    console.log('this is', element);
                    if(element === 'W'){
                        //console.log('white');
                        devotion.White += 1
                    }
                    if(element === 'U'){
                        //console.log('blue');
                        devotion.Blue += 1
                    }
                    if(element === 'B'){
                        //console.log('black');
                        devotion.Black += 1
                    }
                    if(element === 'R'){
                        //console.log('red');
                        devotion.Red += 1
                    }
                    if(element === 'G'){
                        //console.log('green');
                        devotion.Green += 1
                    }

                }
                
            }
        });
        console.log('NEW devotion', devotion);

        return(devotion)
    }

    cmc=(cards)=>{
        //console.log("🚀 ~ file: ViewDeck.js ~ line 184 ~ ViewDeck ~ cards", cards)
        var convertedManaCosts = []

        cards.forEach(card =>{
            //console.log(card.cmc);
            if (card.type_line.includes('land')) {
                //console.log('this is a land and shouldnt be counted');
            }else{
                convertedManaCosts.push(card.cmc)
                //console.log(convertedManaCosts);
            }

            
        })

        convertedManaCosts.forEach(cost =>{
            //console.log(cost);
            
        })
        return(convertedManaCosts)
    }

    

    render(){
        // console.log('recentCard state:',this.state.recentCard);
        const includedCards = this.props.reduxStore.cardList.filter(card => card.deckid === this.props.reduxStore.selectedDeck.id);
        console.log('includedCards:', includedCards);
        const featuredCard = includedCards.filter(featured => featured.is_featured === true)
        const parsedFeaturedCard = featuredCard.map(fCard => JSON.parse(fCard.api_data))
        console.log('parsedFeaturedCard', parsedFeaturedCard);
        const featuredUri = parsedFeaturedCard.map(fUri => fUri.image_uris.normal)
        

        this.countQty(includedCards)
        
        const parsedCards = this.parseCards(includedCards)
        console.log("🚀 ~ file: ViewDeck.js ~ line 168 ~ ViewDeck ~ render ~ parsedCards", parsedCards)
        
        const devotion = this.devotion(parsedCards)
        console.log("🚀 ~ file: ViewDeck.js ~ line 204 ~ ViewDeck ~ render ~ devotion", devotion)

        const cmc = this.cmc(parsedCards)
        console.log("🚀 ~ file: ViewDeck.js ~ line 215 ~ ViewDeck ~ render ~ cmc sans land", cmc)

        return (
                
            <div >



                

                <h1 id="editDeckHeader">Viewing {this.props.reduxStore.selectedDeck.deckname} from {this.props.reduxStore.user.username} </h1>
                {/* <h1 id="editDeckHeader">Total Cards: {this.state.deckQty}</h1> */}

                
                
                <div id="viewDeckEditDeckView" > 
                
                    <div>
                        <img  id="featuredViewDeckCard" src={this.state.hoverCard} width="200px" height="280"/> 
                    </div>

                    <br/>  
                    <h4 id="editDeckHeader">Total Cards: {this.state.deckQty}</h4>

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


                <div>
                    <h1>Total Cards: {this.state.deckQty}</h1>
                    <h1>Devotion</h1>
                    <h3>| White Symbols: {devotion.White} | Blue Symbols: {devotion.Blue} | Black Symbols: {devotion.Black} | Red Symbols: {devotion.Red} | Green Symbols: {devotion.Green} | Colorless Symbols: {devotion.Gray} |</h3>
                    <PieChart viewBoxSize='[100,100]' radius='50'
                        data={[
                            { title: 'One', value: devotion.White, color: 'White' },
                            { title: 'Two', value: devotion.Blue, color: 'Blue' },
                            { title: 'Three', value: devotion.Black, color: 'Black' },
                            { title: 'Four', value: devotion.Red, color: 'Red' },
                            { title: 'Five', value: devotion.Green, color: 'Green' },
                            { title: 'Six', value: devotion.Gray, color: 'Gray' },
                        ]}
                    />;
                </div>

            </div>);
        }
    }

    const mapStateToProps = (reduxStore) => ({
    reduxStore
    })

export default connect(mapStateToProps)(ViewDeck);
