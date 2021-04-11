
import React, { useRef, useState } from 'react';
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

export default function InventoryModalBodyAdd(props) {
  const classes = useStyles();
  var db = firebase.firestore();

  const handleCloseModal = props.handleCloseModal;
  const nameRef = useRef(null);
  const numRef = useRef(null);
  const nameCnRef = useRef(null);

  const firestoreAddHandler = () => {
    const name = nameRef.current?.value;
    const num = numRef.current?.value;
    const name_cn = nameCnRef.current?.value;
    db.collection("medicine").doc(name).set({
      name: name,
      num: parseInt(num),
      name_cn: name_cn,
    }, { merge: true }).then(() => {
      console.log("Created " + name + "!");
    })
  };

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [nameCnErrorMessage, setNameCnErrorMessage] = useState("");
  const [numErrorMessage, setNumErrorMessage] = useState("");
  const checkValidity = () => {
    let error = false;
    const num = numRef.current?.value;
    if (!num || parseInt(num) < 0 || num % 1 !== 0) {
      setNumErrorMessage("Number must be a positive integer")
      error = true;
    }

    const name = nameRef.current?.value;
    if (!name) {
      setNameErrorMessage("Name cannot be empty");
      error = true;
    }

    const name_cn = nameCnRef.current?.value;
    if (!name_cn) {
      setNameCnErrorMessage("NameCN cannot be empty");
      error = true;
    }

    if (!error) {
      setNameErrorMessage("");
      setNameCnErrorMessage("");
      setNumErrorMessage("");
      return true;
    }
    return false;
  }

  const onSubmit = (event) => {
    // prevent reloading upon submit.
    event.preventDefault();
    if (checkValidity()) {
      firestoreAddHandler();
      handleCloseModal();
    }
  }

  return (
    <div className={classes.paper}>
      Add new entry
      <br/>
      <form onSubmit={onSubmit}>
        <TextField required
          name="name"
          label="Name"
          margin="normal"
          defaultValue=""
          inputRef={nameRef}
          error={!!nameErrorMessage}
          helperText={nameErrorMessage && nameErrorMessage}
        />
        <TextField required
          name="name_cn"
          label="NameCN"
          margin="normal"
          defaultValue=""
          inputRef={nameCnRef}
          error={!!nameCnErrorMessage}
          helperText={nameCnErrorMessage && nameCnErrorMessage}
        />
        <TextField required
          name="num" 
          label="Num" 
          type="number" 
          defaultValue={0} 
          margin="normal"
          inputRef={numRef}
          error={!!numErrorMessage}
          helperText={numErrorMessage && numErrorMessage}
        />
        <br/>
        <Button variant="contained"
          color="primary"
          type="submit"
        >
          Add
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