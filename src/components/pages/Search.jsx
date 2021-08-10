import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useState } from "react";

//Search page styles.
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(25)
  },
  search: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
  button: {
    margin: theme.spacing(1),
    height: '52px',
    width: '120px'
  },
}));

const Search = () => {

  const classes = useStyles();
  const [searchText, setSearchText] = useState("")
  const history = useHistory();

  //Display the search page, include a button to open the search results page using the search text.
  return (
    <div className={classes.content}>

      <h1>Search</h1>

      <form className={classes.search} noValidate autoComplete="off">
        <TextField id="outlined-search" type="search" variant="outlined" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" color="primary" className={classes.button} onClick={searchText.length > 0 ? (() => history.push(`/Search_Results/${searchText}`)) : <div> </div>}>Search</Button>
      </form>

    </div>
  );
};

export default Search;