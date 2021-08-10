import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';

//Category Detail page styles.
const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(25)
    },
}));

const CategoryDetail = () => {

    const classes = useStyles();
    const { name } = useParams();
    const [categoryDetailInfo, setcategoryDetailInfo] = useState();
    const history = useHistory();

    //Get the Category detail for the selected category from the back-end API.
    useEffect(() => {
        axios.get(`http://localhost:21635/chuck/categories/jokes/random/${name}`).then((res) => {
            const responseCategory = res.data;
            setcategoryDetailInfo(responseCategory);
        })
    }, [name]);

    const { categories, created_at, icon_url, id, updated_at, url, value } = categoryDetailInfo || {};

    //Display the Category Detail on the Category Detail page, include a back button to return to the Categories Page.
    return (
        <div className={classes.content}>
        
            <h1>Category Detail</h1>

            {categories ? (
                <div>
                    <p>ID: {id}</p>
                    <p>Category: {categories.join('\n')}</p>
                    <p>Icon URL: {icon_url}</p>
                    <p>Created At: {created_at}</p>
                    <p>Updated At: {updated_at}</p>
                    <p>URL:  {url}</p>
                    <p>Joke:  {value}</p>
                    <Button variant="contained" color="primary" onClick={() => history.push(`/`)}>Go Back</Button>
                </div>
            ) : <CircularProgress />}
        </div>
    );
};

export default CategoryDetail;