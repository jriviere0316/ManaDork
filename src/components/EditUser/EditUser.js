import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
const mtg = require('mtgsdk')


class EditUser extends Component {

    state = {
       username: this.props.store.user.username,
       img_url: this.props.store.user.img_url
    }
   
    editUser=() =>{
        console.log('clicked save user changes');
        // this.props.history.push('/user')
    }
    
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [ propertyName ]: event.target.value
        })
    }

    render(){
        // console.log('recentCard state:',this.state.recentCard);
        return (
                
                <div >


                    <div id="editUserDiv">
                        <h1>EDIT USER PAGE</h1>
                        <form>
                            <input 
                            type="text"
                            placeholder="username" 
                            value={this.state.username} 
                            onChange={(event)=>this.handleChange(event, 'username')}>
                            </input>

                            <br/>

                            <input 
                            type="text"
                            placeholder="image_url" 
                            value={this.state.img_url} 
                            onChange={(event)=>this.handleChange(event, 'img_url')}>
                            </input> 

                            <br/>
                            <button onClick={this.editUser}>Save Changes</button>
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
