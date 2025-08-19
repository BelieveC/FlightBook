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
  },
  elegantHeaderTitle: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    }
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
          <Typography variant="h6" className={classes.elegantHeaderTitle} noWrap>
            Flight Book
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header