
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <IfFirebaseUnAuthed>
        {() => {
          return (
            <>
              Welcome!
            </>
          );
        }}
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthed>
        {({ user }) => {
          const userEmail = user.email;
          return (
            <>
              Welcome, {userEmail}!
            </>
          );
        }}
      </IfFirebaseAuthed>
    </div>
  );
}