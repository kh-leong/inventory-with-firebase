
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

  return (
    <div className={classes.paper}>
      Add new entry
      <br/>
      <TextField required
        name="name"
        label="Name"
        margin="normal"
        inputRef={nameRef}
      />
      <TextField required
        name="name_cn"
        label="Name_cn"
        margin="normal"
        inputRef={nameCnRef}
      />
      <TextField required
        name="num" 
        label="Num" 
        type="number" 
        defaultValue={0} 
        margin="normal"
        inputRef={numRef}
      />
      <br/>
      <Button variant="contained"
        color="primary"
        onClick={() => {
          // TODO: validation for TextFields
          firestoreAddHandler();
          handleCloseModal();
        }}
      >
        Add
      </Button>
      <Button variant="outlined"
        onClick={handleCloseModal}
      >
        Cancel
      </Button>
    </div>
  );
}