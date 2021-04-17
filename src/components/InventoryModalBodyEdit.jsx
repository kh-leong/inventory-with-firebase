
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import * as FirebaseConstants from '../constants/Firebase';
import { ERROR_MSG } from '../constants/InventoryModalBody';

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
    db.collection(FirebaseConstants.INVENTORY_COLLECTION).doc(modalData.name).set({
      num: parseInt(numRef.current?.value),
    }, { merge: true }).then(() => {
      console.log("Updated " + modalData.name + "!");
    })
  };

  const [errorMessage, setErrorMessage] = useState("");
  const checkValidity = () => {
    const num = numRef.current?.value;
    if (!num || parseInt(num) < 0 || num % 1 !== 0) {
      setErrorMessage(ERROR_MSG.NUMBER_NOT_POSITIVE);
      return false;
    }

    setErrorMessage("");
    return true;
  }

  const onSubmit = (event) => {
    // prevent reloading upon submit.
    event.preventDefault();
    if (checkValidity()) {
      firestoreUpdateHandler();
      handleCloseModal();
    }
  }

  return (
    <div className={classes.paper}>
      Edit {modalData.name_cn}
      <br/>
      <form onSubmit={onSubmit}>
        <TextField required
          error={!!errorMessage}
          name="num" 
          label="Num" 
          type="number" 
          defaultValue={modalData.num} 
          margin="normal"
          inputRef={numRef}
          helperText={errorMessage && errorMessage}
        />
        <br/>
        <Button variant="contained"
          color="primary"
          type="submit"
        >
          Edit
        </Button>
        <Button variant="outlined"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}