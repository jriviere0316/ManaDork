const deckReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DECK':
        return action.payload;
      case 'UNSET_DECK':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default deckReducer;
  