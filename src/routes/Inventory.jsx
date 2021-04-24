
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InventoryTable from '../components/InventoryTable';
import { FirestoreCollection } from '@react-firebase/firestore';
import InventoryModal from '../components/InventoryModal';
import { CircularProgress, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import * as FirebaseConstants from '../constants/Firebase';
import * as Enums from '../constants/Enums';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


export default function Inventory(props) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(Enums.MODAL_TYPE.NONE);
  const [modalData, setModalData] = useState(null);
  const type = props.type;

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(Enums.MODAL_TYPE.NONE);
    setModalData(null);
  };

  const onClickEdit = data => e => {
    console.log("Edit");
    console.log(data);
    setShowModal(true);
    setModalType(Enums.MODAL_TYPE.EDIT);
    setModalData(data);
  };

  const onClickDelete = data => e => {
    console.log("Delete");
    console.log(data);
    setShowModal(true);
    setModalType(Enums.MODAL_TYPE.DELETE);
    setModalData(data);
  };

  const onClickAdd = () => {
    setShowModal(true);
    setModalType(Enums.MODAL_TYPE.ADD);
  };

  return (
    <div className={classes.margin}>
      <FirestoreCollection path={"/" + FirebaseConstants.INVENTORY_COLLECTION}>
        {d => {
          return (
            d.isLoading ? <CircularProgress/> 
            : 
            <InventoryTable data={d.value}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              type={type}
            />
          );
        }}
      </FirestoreCollection>
      <InventoryModal showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        modalData={modalData}
      />
      { type === Enums.INVENTORY_TYPE.ADMIN &&
        <Fab className={classes.fab} 
          color="primary"
          onClick={onClickAdd}
        >
          <Add/>
        </Fab>
      }
    </div>
  );
}