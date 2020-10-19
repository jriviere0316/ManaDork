import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div>
    <h1>A turn in a Magic game consists of five phases, in this order:</h1>

<p>Beginning phase</p>
<p>Pre-combat main phase</p>
<p>Combat phase</p>
<p>Post-combat main phase</p>
<p>Ending phase</p>
  </div>
);

// If you needed to add local state or other things,
// you can make it a class component like:

/*
class InfoPage extends React.Component {

  render() {
    return (
      <div>
        <p>Info Page</p>
      </div>
    )
  }
}
*/
export default InfoPage;
