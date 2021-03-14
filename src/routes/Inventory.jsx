
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from './../components/TableComponent';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Inventory() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <TableComponent/>
    </div>
  );
}