import 'date-fns';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Flight from '@material-ui/icons/Flight';
import Heart from '@material-ui/icons/Favorite';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FlightCard from './FlightCard'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CURRENT_SELECTED_DATE } from '../constants'
import { isTodaySessionOver, formatDate } from '../utils/helper'

 const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Flight Book
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  footerIcon: {
    fontSize: '1.0rem'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 2),
    marginTop: 'auto'
  },
}));

export default function Main() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedDate = useSelector(state => state.currentSelectedDate)

  const dispatchDateChange = (payload) => dispatch({ type: ADD_CURRENT_SELECTED_DATE, payload})

  const handleDateChange = (date) => {
    const formatedDate = formatDate(date)
    dispatchDateChange(formatedDate)
  }

  var maxDate = new Date()

  if(!isTodaySessionOver()){
    maxDate.setDate(maxDate.getDate() - 1);
  }

  return (
    <div className={classes.root}>
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
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Flight Book
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Nifty Trading Manual using Secrets of a Pivot Boss
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      maxDate={maxDate}
                      autoOk
                      label="Choose Trading Date"
                      id="date-picker-inline"
                      clearable
                      disableFuture
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      maxDate={maxDate}
                      disableToolbar
                      clearable
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Choose Trading Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider> */}
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <hr/>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              <FlightCard/>
            </Grid>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Made with <Heart className={classes.footerIcon}/> by <Link color="inherit" href="http://github.com/believeC"> BelieveC </Link>
          </Typography>
          <Copyright />
        </footer>
      </React.Fragment>
    </div>
  );
}