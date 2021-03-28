
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from './../components/TableComponent';
import { FirestoreCollection } from '@react-firebase/firestore';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function Inventory() {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const onClickEdit = data => e => {
    console.log("Edit");
    console.log(data);
    setShowModal(true);
    setModalType("edit");
  };

  const onClickDelete = data => e => {
    console.log("Delete");
    console.log(data);
    setShowModal(true);
    setModalType("delete");
  };

  let body;
  if (modalType == "edit") {
    body = (
      <div className={classes.paper}>
        Edit
      </div>
    );
  } else if (modalType == "delete") {
    body = (
      <div className={classes.paper}>
        Delete
      </div>
    );
  } else {
    body = (
      <div className={classes.paper}>
      </div>
    );
  }

  return (
    <div className={classes.margin}>
      <FirestoreCollection path="/medicine">
        {d => {
          return (d.isLoading ? console.log("Loading") : <TableComponent data={d.value} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />);
        }}
      </FirestoreCollection>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        {body}
      </Modal>
    </div>
  );
}