
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import firebase from "firebase/app";
import "firebase/auth";
import { IfFirebaseUnAuthed } from '@react-firebase/auth';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Login() {
  const classes = useStyles();
  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();

  const signIn = () => {
    firebase.auth().signInWithEmailAndPassword(loginIdRef.current?.value, passwordRef.current?.value).then((userCredential) => {
      history.push("/");
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Invalid user or password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  };

  return (
    <IfFirebaseUnAuthed>
    {() => { return (
      <div className={classes.margin}>
        <form className="form">
          <Grid container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField required
                id="login-id"
                name="loginid"
                label="Email Address"
                inputRef={loginIdRef}
              />
            </Grid>
          </Grid>
          <Grid container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <Lock />
            </Grid>
            <Grid item>
              <TextField id="password"
                name="password"
                label="Password"
                type="password"
                inputRef={passwordRef}
              />
            </Grid>
          </Grid>
          <Button variant="contained"
            color="primary"
            onClick={signIn}
          >
            LOG IN
          </Button>
        </form>
      </div>
    )}}
    </IfFirebaseUnAuthed>
  );
}