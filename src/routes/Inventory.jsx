
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

  const onClickEdit = data => e => {
    console.log("Edit");
    console.log(data);
  };

  const onClickDelete = data => e => {
    console.log("Delete");
    console.log(data);
  };

  return (
    <div className={classes.margin}>
      <FirestoreCollection path="/medicine">
        {d => {
          return (d.isLoading ? console.log("Loading") : <TableComponent data={d.value} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />);
        }}
      </FirestoreCollection>
    </div>
  );
}