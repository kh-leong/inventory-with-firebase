
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from './../components/TableComponent';
import { FirestoreCollection } from '@react-firebase/firestore';
import TableEditModalComponent from '../components/TableEditModalComponent';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function Inventory() {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    setModalData(null);
  };

  const onClickEdit = data => e => {
    console.log("Edit");
    console.log(data);
    setShowModal(true);
    setModalType("edit");
    setModalData(data);
  };

  const onClickDelete = data => e => {
    console.log("Delete");
    console.log(data);
    setShowModal(true);
    setModalType("delete");
    setModalData(data);
  };

  return (
    <div className={classes.margin}>
      <FirestoreCollection path="/medicine">
        {d => {
          return (d.isLoading ? <CircularProgress/> : <TableComponent data={d.value} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />);
        }}
      </FirestoreCollection>
      <TableEditModalComponent showModal={showModal} handleCloseModal={handleCloseModal} modalType={modalType} modalData={modalData}/>
    </div>
  );
}