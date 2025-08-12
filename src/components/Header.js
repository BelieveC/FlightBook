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
    animation: '$fly 3s ease-in-out infinite',
    color: '#fda085',
  },
  headerTitle: {
    fontWeight: 'bold',
    letterSpacing: '2px',
    background: 'linear-gradient(90deg, #fff 0%, #f093fb 50%, #fff 100%)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: '$shimmer 3s linear infinite',
    textTransform: 'uppercase',
  },
  '@keyframes fly': {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg)',
    },
    '25%': {
      transform: 'translateY(-3px) rotate(-5deg)',
    },
    '75%': {
      transform: 'translateY(3px) rotate(5deg)',
    }
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '200% 0',
    },
    '100%': {
      backgroundPosition: '-200% 0',
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
          <Typography variant="h6" color="inherit" noWrap className={classes.headerTitle}>
            Flight Book
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header