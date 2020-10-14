import React, {Component} from 'react';
// import {connect} from 'react-redux';
const mtg = require('mtgsdk')


class EditDeck extends Component {

    state = {
        cardSearchInput: '',
        recentCard: ''
    }
    // test=()=>{
    //     mtg.card.find(3)
    //     .then(result => {
    //         console.log(result.card.imageUrl) // "Black Lotus"
    //     })
    // }

    handleSearchInput=(event)=>{
        // console.log('event:', event.target.value);
          this.setState({
            cardSearchInput: event.target.value
          })
      }



    test=()=>{
        mtg.card.all({ name: `${this.state.cardSearchInput}`, pageSize: 1 })
        .on('data', card => {
            console.log(card)
        this.setState({
            recentCard: card
        })
        })
    }

    render(){
        // console.log('recentCard state:',this.state.recentCard);
        return (
                
                <div >

                    <div>

                        <h1>edit deck page</h1>
                    </div>
                    
                    <div id="descriptionDiv">
                    <form>

                        <input id="deckName" placeholder="Deck Name"></input>
                            <label htmlFor="isPublic">Public</label>
                            <input type="radio" name='publicstatus' id="isPublic" value="public"></input>
                            <label htmlFor="isPrivate">Private</label>
                            <input type="radio" name='publicstatus' id="isPrivate" value="private"></input>
                        </form>
                        <br/>
                        <textarea id="descriptionInput" placeholder="Deck Description"></textarea>
                        <br/>
                        <button >Save</button>
                        <button>Save and Continue Editing</button>
                    </div>
                        
                    <br/>    
                    <div>
                        <form id="cardInputForm">
                            <input placeholder="Card Name" onChange={this.handleSearchInput}></input>
                            <br/>
                            <input placeholder="Quantity"></input><br/>
                            <button onClick={this.test}> * Add To Deck * </button><br/>
                            <label htmlFor="isCmdrinput">Is this your commander?</label><br/>
                            <input type="checkbox" id="isCmdrinput" value="Commander"></input><br/>
                            <button>Save</button>
                            <button>Save and Continue Editing</button><br/>
                            <button id="deleteDeckBtn">Delete Deck</button><br/>
                        </form>
                    </div>
                    
                    <br/>

                    <div id="featuredCardDiv">
                        <div id="cardImg">
                            <img src={this.state.recentCard.imageUrl} width='150px' height='250px'/>
                        </div>
                        <input placeholder="Select Featured Card"></input>
                        <br/>
                        <button>Save</button>
                        <button>Save and Continue Editing</button>
                    </div>


                    <div id="cardImg">
                        <img src={this.state.recentCard.imageUrl}>
                        </img>
                    </div>


                    <div id="listDisplay">
                        <h1>List Display</h1>
                        <textarea id="listDisplayTextArea">

                        </textarea>

                    </div>



                </div>
        );
    }
}

// const mapStateToProps = (reduxStore) => ({
//   reduxStore
// })

export default EditDeck;
