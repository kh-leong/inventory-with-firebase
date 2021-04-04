
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function InventoryModalBodyDelete(props) {
  const classes = useStyles();
  var db = firebase.firestore();

  const handleCloseModal = props.handleCloseModal;
  const modalData = props.modalData;

  const firestoreDeleteHandler = () => {
    db.collection("medicine").doc(modalData.name).delete()
    .then(() => {
      console.log("Deleted " + modalData.name + "!");
    })
  };

  return (
      <div className={classes.paper}>
        Delete {modalData.name_cn}?
        <br/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            firestoreDeleteHandler();
            handleCloseModal();
          }}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </div>
  );
}