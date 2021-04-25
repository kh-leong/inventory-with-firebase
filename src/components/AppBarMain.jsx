
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";
import AppBarMenu from "./AppBarMenu";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import firebase from "firebase/app";
import "firebase/auth";
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "static",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBarMain(props) {
  const classes = useStyles();
  const history = useHistory();

  const logOut = () => {
    firebase.app().auth().signOut().then(() => {
      history.push("/");
    }).catch((error) => {
      alert("An error occurred while signing out.");
      console.log(error);
    });
  }

  const goToProfile = () => {
    history.push("/profile");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <AppBarMenu/ >
          <Typography variant="h6" 
            className={classes.title}
          >
            Inventory
          </Typography>
          <IfFirebaseUnAuthed> 
            { () => { return (
              <Button color="inherit"
                component={Link}
                to="/login"
              >
                Log in
              </Button>
            )}}
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>
            { () => { return (
              <>
                <Tooltip title="Profile">
                  <IconButton color="inherit"
                    onClick={goToProfile}
                  >
                    <AccountCircle/>
                  </IconButton>
                </Tooltip>
                <Button color="inherit"
                  onClick={logOut}
                >
                  Log out
                </Button>
              </>
            )}}
          </IfFirebaseAuthed>
        </ToolBar>
      </AppBar>
    </div>
  );
}