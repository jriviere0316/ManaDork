// /* eslint-disable no-use-before-define */
// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

// export default function ComboBox() {

//     function handleChange(event, value) {
//         console.log('event:', value);
//         this.props.dispatch({
//             type: 'FETCH_CARD',
//             payload: event.target.value
//         })  
//     }


//   return (
//     <Autocomplete
//       id="combo-box-cards"
//       onInputChange={handleChange}
//       options={cardOptions }
//       getOptionLabel={(option) => option.title}
//       style={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Card Search" variant="outlined" />}
//     />
//   );
// }







// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

//     const cardQuery = (card) => {
//         // this.props.dispatch({
//         //   type: 'FETCH_CARD',
//         //   payload: card
//         // });
//         // { title: 'The Shawshank Redemption', year: 1994 },

//     }


//     const cardOptions = [ ]







// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  
  if (options.length === undefined) {
    debugger;
  }
  
  const [cardSearchInput, setcardSearchInput] = useState('island');

  function handleChange(event, value) {
    console.log('event:', value);
    setcardSearchInput(value)
    console.log('search input is:', cardSearchInput);
  }


  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  let active = true;
  React.useEffect(() => {
    

    if (!loading) {
      return undefined;
    }
    
    (async () => {
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${cardSearchInput}
        `);
        await sleep(1); // For demo purposes.
        console.log(response);
        const cards = await response.json();
        console.log(cards);
        
        if (active) {
          const mapstatement = (cards.data)
          console.log('new options are:', mapstatement);
          setOptions(mapstatement);
        }
      })();
    
        return () => {
        active = false;
    };
  }, [open, options]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onInputChange={handleChange}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}


      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}


      renderInput={(params) => (
        <TextField
          {...params}
          label="Card Search"
          variant="outlined"
          value={cardSearchInput}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
