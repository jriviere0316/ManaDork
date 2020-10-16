import React, { useEffect, useState, useRef } from "react";
// import logo from "./logo.svg";
// import "./App.css";

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const [cardSearchInput, setcardSearchInput] = useState('sliver');


  function handleChange(event, value) {
    console.log('event:', value);
    setcardSearchInput(value)
  }




  useEffect(() => {
    const cards = [];
    const promises = new Array(10)
      .fill()
      .map((v, i) => fetch(`https://api.scryfall.com/cards/search?q=${cardSearchInput}`));
    Promise.all(promises).then(cardsArr => {
      return cardsArr.map(value =>
        value
          .json()
          .then(({ name }) =>
            cards.push({ name})
          )
      );
    });
    setOptions(cards);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value.name)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.name}</span>
                  {/* <img src={value.sprite} alt="cards" /> */}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App;




// // *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from 'cross-fetch';
// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import CircularProgress from '@material-ui/core/CircularProgress';

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

// export default function Asynchronous() {
//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState([]);
//   const loading = open && options.length === 0;

//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }

//     (async () => {
//       const response = await fetch(`https://api.magicthegathering.io/v1/cards/`);
//       // const response = await fetch(`https://api.magicthegathering.io/v1/cards`);
//       await sleep(1); // For demo purposes.
//       console.log(response);
//       const cards = await response.json();
//       console.log(cards);
//       // cards.forEach(element => {
//       //   console.log(element);

//       // });
//       if (active) {
//         // setOptions(Object.keys(cards).map((key) => cards[key].name));
//         setOptions(Object.keys(cards).map((id) => cards[id][0]));

//         // setOptions(Object.keys(cards).map((card) => cards[card][0]));
//           // setOptions(cards.map((card) => cards[card]));
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [loading]);

//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);

//   return (
//     <Autocomplete
//       id="asynchronous-demo"
//       style={{ width: 300 }}
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       getOptionSelected={(option, value) => option.name === value.name}
//       getOptionLabel={(option) => option.name}
//       options={options}
//       loading={loading}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Card Search"
//           variant="outlined"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <React.Fragment>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </React.Fragment>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// }
