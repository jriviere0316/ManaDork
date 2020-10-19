const listReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LIST':
        return action.payload;
      case 'UNSET_LIST':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default listReducer;
  