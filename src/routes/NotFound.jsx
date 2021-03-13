
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      Page not found!
    </div>
  );
}