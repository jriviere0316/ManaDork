import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



class ViewDeck extends Component {

    state = {
        
    }

    render(){
        // console.log('recentCard state:',this.state.recentCard);
        return (
                
            <div >
                <h1>VIEWING: {this.props.reduxStore.selectedDeck.deckname}</h1>

            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
reduxStore
})

export default connect(mapStateToProps)(ViewDeck);
