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
