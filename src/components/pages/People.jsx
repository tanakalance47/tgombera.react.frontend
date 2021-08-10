import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

//People page styles.
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(25)
  },
}));

//Define columns for the table used to display the StarWars people.
const columns = [
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

const People = () => {

  const classes = useStyles();
  const [people, setPeople] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Get the StarWars people from the back-end API.
  useEffect(() => {
    axios.get('http://localhost:21635/swapi/people').then((res) => {
      const responsePeople = res.data;
      setPeople(responsePeople);
    })
  }, []);

  //Define the rows for the StarWars people table.
  const rows = people;

  //Display the StarWars people in a table.
  return (
    <div className={classes.content}>

      <h1>People</h1>

      {people ? (
        <div style={{ height: 400, width: '100%' }}>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
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
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      ) : <CircularProgress />}
    </div>
  );
};

export default People;