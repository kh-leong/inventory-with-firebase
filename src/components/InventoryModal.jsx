
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import InventoryModalBodyEdit from './InventoryModalBodyEdit';
import InventoryModalBodyDelete from './InventoryModalBodyDelete';
import InventoryModalBodyAdd from './InventoryModalBodyAdd';

const useStyles = makeStyles((theme) => ({
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
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function InventoryModal(props) {
  const classes = useStyles();

  const showModal = props.showModal;
  const handleCloseModal = props.handleCloseModal;
  const modalType = props.modalType;
  const modalData = props.modalData;

  let body;
  if (modalType === "edit") {
    body = <InventoryModalBodyEdit 
              handleCloseModal={handleCloseModal}
              modalData={modalData}
            />
  } else if (modalType === "add") {
    body = <InventoryModalBodyAdd
              handleCloseModal={handleCloseModal}
            />
  } else if (modalType === "delete") {
    body = <InventoryModalBodyDelete 
              handleCloseModal={handleCloseModal}
              modalData={modalData}
            />
  } else {
    body = (
      <div className={classes.paper}>
      </div>
    );
  }

  return (
    <Modal 
      open={showModal}
      onClose={handleCloseModal}
      className={classes.modal}>
      <>
        {body}
      </>
    </Modal>
  );
}