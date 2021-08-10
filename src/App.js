import React from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import Categories from "./components/pages/Categories";
import People from "./components/pages/People";
import Search from "./components/pages/Search";
import Drawer from "./components/menu/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CategoryDetail from "./components/pages/Category_Detail";
import SearchResults from "./components/pages/Search_Results";

//Define the drawer's width.
const drawerWidth = 150;

//Define base styles.
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

//Include the AppBar, Drawer and define routes used by the React Router.
export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Drawer />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            FS Engineer Test (Chuck/Swapi/C#)
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Switch>
        <Route exact from="/" render={props => <Categories {...props} />} />
        <Route exact path="/people" render={props => <People {...props} />} />
        <Route exact path="/search" render={props => <Search {...props} />} />
        <Route exact path="/category_detail/:name" render={props => <CategoryDetail {...props} />} />
        <Route exact path="/Search_Results/:searchText" render={props => <SearchResults {...props} />} />
      </Switch>
    </div>
  );
}