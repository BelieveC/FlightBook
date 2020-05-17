import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Heart from '@material-ui/icons/Favorite';
import Copyright from './Copyright'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footerIcon: {
    fontSize: '1.0rem'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 2),
    marginTop: 'auto'
  },
}));

const Footer = () =>
{
  const classes = useStyles()
  return(
    <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Made with <Heart className={classes.footerIcon}/> by <Link color="inherit" href="http://github.com/believeC"> BelieveC </Link>
      </Typography>
      <Copyright />
    </footer>
  )
}
  
export default Footer