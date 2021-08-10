import React from "react";
import {
    Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';

//Side drawer styles.
const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

//The side drawer used as the menu for the application.
const Drawer = (props) => {
    
    const classes = useStyles();
    const { history } = props;
    const itemsList = [
        {
            text: 'Categories',
            icon: <CategoryIcon />,
            onClick: () => history.push("/")
        },
        {
            text: 'People',
            icon: <PeopleIcon />,
            onClick: () => history.push("/people")
        },
        {
            text: 'Search',
            icon: <SearchIcon />,
            onClick: () => history.push("/search")
        }];

    return (
        <MUIDrawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper, }}>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {itemsList.map((item, index) => {
                        const { text, icon, onClick } = item;
                        return (
                            //A button and icon is used for each list item.
                            <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </MUIDrawer>
    );
}

export default withRouter(Drawer);