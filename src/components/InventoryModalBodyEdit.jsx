
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
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

export default function InventoryModalBodyEdit(props) {
  const classes = useStyles();
  var db = firebase.firestore();

  const handleCloseModal = props.handleCloseModal;
  const modalData = props.modalData;
  const numRef = useRef(null);

  const firestoreUpdateHandler = () => {
    db.collection("medicine").doc(modalData.name).set({
      num: parseInt(numRef.current?.value),
    }, { merge: true }).then(() => {
      console.log("Updated " + modalData.name + "!");
    })
  };

  return (
    <div className={classes.paper}>
      Edit {modalData.name_cn}
      <br/>
      <TextField required
        name="num" 
        label="Num" 
        type="number" 
        defaultValue={modalData.num} 
        margin="normal"
        inputRef={numRef}
      />
      <br/>
      <Button variant="contained"
        color="primary"
        onClick={() => {
          // TODO: validation for TextField
          firestoreUpdateHandler();
          handleCloseModal();
        }}
      >
        Edit
      </Button>
      <Button variant="outlined"
        onClick={handleCloseModal}
      >
        Cancel
      </Button>
    </div>
  );
}