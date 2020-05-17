import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Flight from '@material-ui/icons/Flight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  }
}));

const Header = () => {
  const classes = useStyles();

  return(
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Flight className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Flight Book
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header