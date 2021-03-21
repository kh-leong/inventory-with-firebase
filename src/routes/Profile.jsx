
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    // TODO: allow user to change password
    <div className={classes.margin}>
      Profile page
    </div>
  );
}