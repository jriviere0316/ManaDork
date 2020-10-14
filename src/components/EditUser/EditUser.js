import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
const mtg = require('mtgsdk')


class EditUser extends Component {

    state = {
       
    }
   
    editUser=() =>{
        console.log('clicked save user changes');
        this.props.history.push('/user')
    }
   



    

    render(){
        // console.log('recentCard state:',this.state.recentCard);
        return (
                
                <div >


                    <div id="editUserDiv">
                        <h1>EDIT USER PAGE</h1>
                        <input placeholder={this.props.store.user.username}></input>
                        <br/>
                        <input placeholder='{this.props.store.user.imgUrl}'></input> 
                        <br/>
                        <button onClick={this.editUser}>Save Changes</button>
                    </div>
                    


                </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditUser);
