
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from './../components/TableComponent';
import { FirestoreCollection } from '@react-firebase/firestore';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Inventory() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      {/* testing of firestore collection. */}
      <FirestoreCollection path="/medicine">
        {d => {
          return d.isLoading ? console.log("Loading") : console.log(d.value);
        }}
      </FirestoreCollection>
      <TableComponent/>
    </div>
  );
}