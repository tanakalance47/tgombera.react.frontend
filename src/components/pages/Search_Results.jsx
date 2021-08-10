import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

//Search results page styles.
const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(25)
    },
}));

//Define columns for the StarWars people table.
const swapiColumns = [
    {
        id: 'name',
        label: 'Name',
        minWidth: 150,
    },
    {
        id: 'height',
        label: 'Height',
        minWidth: 150,
    },
    {
        id: 'mass',
        label: 'Mass',
        minWidth: 150,
    },
    {
        id: 'hair_color',
        label: 'Hair Color',
        minWidth: 150,
    },
    {
        id: 'skin_color',
        label: 'Skin Color',
        minWidth: 150,
    },
    {
        id: 'birth_year',
        label: 'Birth Year',
        minWidth: 150,
    },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 150,
    },
    {
        id: 'homeworld',
        label: 'Homeworld',
        minWidth: 150,
    },
    {
        id: 'films',
        label: 'Films',
        width: 150,
    },
    {
        id: 'species',
        label: 'Species',
        minWidth: 150,
    },
    {
        id: 'vehicles',
        label: 'Vehicles',
        minWidth: 150,
    },
    {
        id: 'starships',
        label: 'Starships',
        minWidth: 150,
    },
    {
        id: 'created',
        label: 'Created',
        minWidth: 150,
    },
    {
        id: 'edited',
        label: 'Edited',
        minWidth: 150,
    },
    {
        id: 'url',
        label: 'URL',
        minWidth: 150,
    },
];

//Define columns for the Chuck Norris jokes.
const chuckColumns = [
    {
        id: 'id',
        label: 'ID',
        minWidth: 150,
    },
    {
        id: 'icon_url',
        label: 'Icon URL',
        minWidth: 150,
    },
    {
        id: 'url',
        label: 'URL',
        minWidth: 150,
    },
    {
        id: 'value',
        label: 'Value',
        minWidth: 150,
    },
    {
        id: 'created_at',
        label: 'Created At',
        minWidth: 150,
    },
    {
        id: 'updated_at',
        label: 'Updated At',
        minWidth: 150,
    },
];

const Search_Results = () => {

    const classes = useStyles();
    const [results, setResults] = useState();
    const { searchText } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const history = useHistory();

    //Get search results from the backend API using the provided search text
    useEffect(() => {
        axios.get(`http://localhost:21635/search/${searchText}`).then((res) => {
            const responseSearchResults = res.data;
            setResults(responseSearchResults);
        })
    }, [searchText]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { api_name, chuck_search_results, swapi_search_results } = results || {};

    //Define rows for the StarWars people table and the Chuck Norris jokes table.
    const swapiRows = swapi_search_results;
    const chuckRows = chuck_search_results;

    //Display the search results according to the API response, if the results are from the StarWars API the StarWars table is displayed.
    //If the results are from the Chuck Norris API the Chuck Norris jokes table is displayed.
    //If no results have been obtained the 'No results found' paragraph is displayed.
    return (
        <div className={classes.content}>

            <h1>Search Results</h1><br />

            <Button variant="contained" color="primary" onClick={() => history.push(`/search`)}>Go Back</Button><br />

            <h4>Search Text: {searchText}</h4><br />

            {api_name === "chuck" && chuck_search_results.length > 0 ? (
                <div style={{ height: 400, width: '96%' }}>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {chuckColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chuckRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {chuckColumns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'films' || column.id === 'vehicles' || column.id === 'species' || column.id === 'starships' ? value.join('\n') : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={chuckColumns?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            ) : api_name === "swapi" && swapi_search_results.length > 0 ? (<div style={{ height: 400, width: '96%' }}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {swapiColumns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {swapiRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {swapiColumns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'films' || column.id === 'vehicles' || column.id === 'species' || column.id === 'starships' ? value.join('\n') : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={swapiRows?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>) : <p> No results found. </p>}
        </div>
    );
};

export default Search_Results;