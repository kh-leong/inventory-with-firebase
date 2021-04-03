
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ListIcon from '@material-ui/icons/List';
import { IfFirebaseAuthed } from '@react-firebase/auth';
import { Security } from '@material-ui/icons';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function AppBarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose} component={Link} to="/inventory">
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose} component={Link} to="/orders">
          <ListItemIcon>
            <BorderColorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </StyledMenuItem>
        <IfFirebaseAuthed>
          {/* TODO: role based auth */}
          {() => { return (
            <StyledMenuItem onClick={handleClose} component={Link} to="/manage_inventory">
              <ListItemIcon>
                <Security fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Inventory" />
            </StyledMenuItem>
          )}}
        </IfFirebaseAuthed>
      </StyledMenu>
    </div>
  );
}