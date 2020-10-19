import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



class ViewDeck extends Component {

    state = {
        
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


    qtyDown=()=>{
        console.log('clicked -');
    }
    
    qtyUp=()=>{
        console.log('clicked +');

    }

    deleteCard=()=>{
        console.log('clicked delete');

    }


    render(){
        // console.log('recentCard state:',this.state.recentCard);
        const includedCards = this.props.reduxStore.cardList.filter(card => card.deckid === this.props.reduxStore.selectedDeck.id);
        console.log('includedCards:', includedCards);
        return (
                
            <div >
                <h1>Viewing {this.props.reduxStore.selectedDeck.deckname} from {this.props.reduxStore.user.username} </h1>
                <div >
                    <img src={this.props.reduxStore.selectedDeck.featured_card} width="200px" height="280"/>
                </div>            

                <div id="viewDeckTable">   
                    <table >
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Card Name</th>
                                <th>isCMDR?</th>
                                <th>EDIT QTY</th>
                                <th>DELETE</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td>1 x</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                                <td><button>DELETE</button></td>
                            </tr> */}
                            
                            
                            {includedCards.map((card) =>  
                            <tr key={card.id}>
                                <td>x {card.quantity}</td>
                                <td>{card.name}</td>
                                
                                <td>{card.is_cmdr}</td>

                                <td><button onClick={this.qtyDown}>-</button><button onClick={this.qtyUp}>+</button></td>
                                <td><button onClick={this.deleteCard}>DELETE</button></td>  
                            </tr>
                            )}

                        </tbody>
                        {/* ////////////////////////////////////////////////////// */}
                        
                    </table>
                </div>



                    <h5 id="upvotes">Upvotes: {this.props.reduxStore.selectedDeck.upvotes}</h5>
                    <button onClick={() => this.editDeck(this.props.reduxStore.selectedDeck)}>EDIT</button>      
                    <hr/>
                    
                    <p>
                        Description: {this.props.reduxStore.selectedDeck.description}
                    </p>
            </div>

        );
    }
}

const mapStateToProps = (reduxStore) => ({
reduxStore
})

export default connect(mapStateToProps)(ViewDeck);
