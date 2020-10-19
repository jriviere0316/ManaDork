import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



class ViewDeck extends Component {

    state = {
        
    }
    editDeck=(deck)=>{
        console.log('in edit deck with:', deck);
        // this.props.dispatch({
        //   type: 'SET_SELECTEDDECK',
        //   payload: deck
        // })
        this.props.history.push('/editdeck')
      }
    render(){
        // console.log('recentCard state:',this.state.recentCard);
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
                                <th></th>

                                <th>Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1 x</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>12 x</td>
                                <td>Island</td>
                                <td></td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        {/* ////////////////////////////////////////////////////// */}
                        <tbody>
                            <tr>
                                <td>12 x</td>
                                <td>Forest</td>
                                <td></td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>12 x</td>
                                <td>Swamp</td>
                                <td></td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yarok</td>
                                <td>Commander</td>
                                <td><button>-</button><button>+</button></td>
                            </tr>
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
