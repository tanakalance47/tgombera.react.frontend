import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import CategoryItem from '../partial_views/Category'

//Categories page styles.
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(25)
  },
}));

const Categories = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState();

  //Get all Categories from the back-end API.
  useEffect(() => {
    axios.get('http://localhost:21635/chuck/categories').then((res) => {
      const responseCategories = res.data;
      setCategories(responseCategories);
    })
  }, []);

  //Display all Categories on the Categories Page.
  return (
    <div className={classes.content}>
    
      <h1>Categories</h1>
    
      {categories ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {categories.map((cat) => (<CategoryItem key={cat.id} category={cat} />))}
        </div>
      ) : <CircularProgress />}
    </div>
  );
};

export default Categories;