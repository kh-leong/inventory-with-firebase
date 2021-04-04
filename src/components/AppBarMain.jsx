
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
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
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// keeps app bar at the top when scrolling
function ElevationScroll(props) {
  const {children} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

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
      <ElevationScroll {...props}>
        <AppBar>
          <ToolBar>
            <AppBarMenu/ >
            <Typography variant="h6" className={classes.title}>
              Inventory
            </Typography>
            <IfFirebaseUnAuthed> 
            { () => { return (
              <Button color="inherit" component={Link} to="/login">Log in</Button>
            )}}
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
            { () => { return (
              <>
                <Tooltip title="Profile">
                  <IconButton color="inherit" onClick={goToProfile}>
                    <AccountCircle/>
                  </IconButton>
                </Tooltip>
                <Button color="inherit" onClick={logOut}>Log out</Button>
              </>
            )}}
            </IfFirebaseAuthed>
          </ToolBar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}