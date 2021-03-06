import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './EditUser.css'


class EditUser extends Component {

    state = {
        id: this.props.store.user.id,
        username: this.props.store.user.username,
        img_url: this.props.store.user.img_url,
        decks: this.props.store.user.decks,
        img_url: this.props.store.user.img_url,
        clearance: this.props.store.user.clearance,
        friends: this.props.store.user.friends
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.dispatch({
    //         type: 'EDIT_USER',
    //         payload: this.state
    //     })
    //     this.props.history.push('/info');
    // }
   
    editUser=() =>{
        console.log('clicked save user changes');
        // event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: this.state
        })
       this.navHome();
    }
    


    navHome=()=>{
        this.props.history.push('/userHub');

    }
    
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [ propertyName ]: event.target.value
        })
    }

    render(){
        // console.log('recentCard state:',this.state);
        console.log('state is', this.state);
        return (
                
                <div >


                    <div id="editUserDiv">
                        <h1>Edit User</h1>
                        <hr/>
                        <form onSubmit={this.editUser}>
                            <h6 id="editInfoTag">Username</h6>
                            <input 
                            type="text"
                            placeholder="username" 
                            value={this.state.username} 
                            onChange={(event)=>this.handleChange(event, 'username')}>
                            </input>

                            <br/>
                            <h6 id="editInfoTag">Image URL</h6>
                            <input 
                            type="text"
                            placeholder="image_url" 
                            value={this.state.img_url} 
                            onChange={(event)=>this.handleChange(event, 'img_url')}>
                            </input> 

                            <br/>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                    


                </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditUser);
