
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { IfFirebaseAuthed } from '@react-firebase/auth';
import Tooltip from '@material-ui/core/Tooltip';
import * as Enums from '../constants/Enums';
import { TablePagination } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
  root: {
    position: 'static',
    maxWidth: 1000,
    margin: '0 auto',
  },
  container: {
    minHeight: 450,
  },
});

function createData(name, num) {
  return {name, num};
}

const rows = [
  createData('Ball', 10),
  createData('Cup', 50),
  createData('Dog', 100),
];

const columns = [
  'Name',
  'Num',
  '',
];

export default function InventoryTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const data = props.data ? props.data : rows;
  const type = props.type ? props.type : Enums.INVENTORY_TYPE.NORMAL;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <div className={classes.root}>
      <Paper>
      <TableContainer className={classes.container}>
        <Table className={classes.table} 
          aria-label="table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  {row.name_cn ? row.name_cn : row.name}
                </TableCell>
                <TableCell>
                  {row.num}
                </TableCell>
                <TableCell>
                  { type === Enums.INVENTORY_TYPE.ADMIN ?
                    <IfFirebaseAuthed>
                      { () => { 
                        return (
                        <>
                          <Tooltip title="Edit">
                            <IconButton color="inherit" 
                              variant="contained" 
                              onClick={props.onClickEdit(row)}
                            >
                              <EditIcon fontSize="small"/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton color="inherit"
                              variant="contained"
                              onClick={props.onClickDelete(row)}
                            >
                              <DeleteIcon fontSize="small"/>
                            </IconButton>
                          </Tooltip>
                        </>
                        );
                      }}
                    </IfFirebaseAuthed>
                    :
                    <IfFirebaseAuthed>
                      { () => { 
                        return (
                        <>
                          <Tooltip title="Edit">
                            <IconButton color="inherit"
                              variant="contained"
                              onClick={props.onClickEdit(row)}
                            >
                              <EditIcon fontSize="small"/>
                            </IconButton>
                          </Tooltip>
                        </>
                        );
                      }}
                    </IfFirebaseAuthed>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </Paper>
    </div>
  );
}