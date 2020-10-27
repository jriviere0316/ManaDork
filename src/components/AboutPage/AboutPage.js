import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div>
      <p id="aboutPtag">This app was created with Javascript, Postgresql, CSS, Axios, React, Redux, and the Scryfall API</p>
      <p id="aboutPtag">Thank you for using ManaDork!</p>

    </div>
  </div>
);

export default AboutPage;
