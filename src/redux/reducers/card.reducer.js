const initialCard = [{ 
    name: ``,
    image_uris: {
        normal: ''
    }
}]



const cardReducer = (state = initialCard, action) => {
    switch (action.type) {
      case 'SET_CARD':
        return action.payload;
      case 'UNSET_CARD':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default cardReducer;
  