
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <form className="form">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="login-id" label="Login ID" required/>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Lock />
          </Grid>
          <Grid item>
            <TextField id="password" label="Password" type="password" required/>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary">
          LOG IN
        </Button>
      </form>
    </div>
  );
}