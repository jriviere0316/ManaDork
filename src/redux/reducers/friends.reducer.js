const friendsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FRIENDS':
        return action.payload;
      case 'UNSET_FRIENDS':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default friendsReducer;
  