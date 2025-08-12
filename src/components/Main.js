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
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { ADD_CURRENT_SELECTED_DATE, SET_SELECTED_MARKET, INITIAL_LOAD, INITIAL_LOAD_US } from '../constants'
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
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    padding: theme.spacing(4),
  },
  errorContainer: {
    padding: theme.spacing(4),
    maxWidth: '600px',
    margin: '0 auto',
  },
  tabsContainer: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
  },
  tabPanel: {
    padding: theme.spacing(2, 0),
  }
}));

export default function Main() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedDate = useSelector(state => state.currentSelectedDate)
  const selectedMarket = useSelector(state => state.selectedMarket)
  const loading = useSelector(state => state.loading)
  const error = useSelector(state => state.error)

  const [tabValue, setTabValue] = React.useState(selectedMarket === 'US' ? 1 : 0)

  const dispatchDateChange = (payload) => dispatch({ type: ADD_CURRENT_SELECTED_DATE, payload})

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const market = newValue === 0 ? 'INDIAN' : 'US';
    dispatch({ type: SET_SELECTED_MARKET, payload: market });
    
    // Trigger data load for the selected market
    if (market === 'US') {
      dispatch({ type: INITIAL_LOAD_US });
    } else {
      dispatch({ type: INITIAL_LOAD });
    }
  };

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
        <Box className={classes.tabsContainer}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Indian Stock Market" />
            <Tab label="US Stock Market" />
          </Tabs>
        </Box>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Flight Book
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              {selectedMarket === 'US' 
                ? 'US Market Trading Manual using Secrets of a Pivot Boss'
                : 'Nifty Trading Manual using Secrets of a Pivot Boss'
              }
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
          {loading ? (
            <div className={classes.loadingContainer}>
              <CircularProgress size={60} />
            </div>
          ) : error ? (
            <div className={classes.errorContainer}>
              <Alert severity="error">
                <AlertTitle>Error Loading Market Data</AlertTitle>
                {error.message || 'Failed to load market data. Please check your API key and try again.'}
                <br />
                <br />
                <strong>To fix this:</strong>
                <ol style={{ marginTop: '8px' }}>
                  <li>Get a free API key from <a href="https://finnhub.io/" target="_blank" rel="noopener noreferrer">finnhub.io</a></li>
                  <li>Add it to the .env.development file: REACT_APP_ACCESS_TOKEN=your_key_here</li>
                  <li>Restart the development server</li>
                </ol>
              </Alert>
            </div>
          ) : (
            <Grid container spacing={4}>
              <FlightCard/>
            </Grid>
          )}
        </Container>
      </main>
      <Footer/>
    </div>
  );
}