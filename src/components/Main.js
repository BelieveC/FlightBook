import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FlightCard from './FlightCard'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CURRENT_SELECTED_DATE } from '../constants'
import { isTodaySessionOver, formatDate } from '../utils/helper'
import { IndexSelectionDropdown } from './IndexSelectionDropdown'
import Footer from './Footer'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper
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
  }
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

  var minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 2);

  var maxDate = new Date()
  if(!isTodaySessionOver()){
    maxDate.setDate(maxDate.getDate() - 1);
  }

  return (
    <div className={classes.root}>
      <Header/>
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
              <Grid container spacing={4} justify="center">
                <Grid item>
                  <IndexSelectionDropdown/>
                </Grid>
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      maxDate={maxDate}
                      minDate={minDate}
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
      <Footer/>
    </div>
  );
}