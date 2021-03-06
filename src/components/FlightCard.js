import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import PreviousDay from './PreviousDay'
import PivotRange from './PivotRange'
import CamarillaRange from './CamarillaRange'
import PivotTwoDayRelation from './PivotTwoDayRelation'
import CamarillaTwoDayRelation from './CamarillaTwoDayRelation'
import { useSelector } from 'react-redux';
import { isEmpty, findLastIndex } from 'lodash'
import { useStyles } from './styles'

export default function FlightCard() {
  const currentSelectedDate = useSelector(state => state.currentSelectedDate)
  const currentSelectedIndex = useSelector(state => state.currentSelectedIndex)

  const indices = {
    'nifty50': useSelector(state => state.nifty),
    'bankNifty': useSelector(state => state.bankNifty)
  }

  const indicesName = {
    'nifty50': 'Nifty 50',
    'bankNifty': 'Bank Nifty'
  }

  const currentIndex = isEmpty(currentSelectedIndex) ? [] : indices[currentSelectedIndex]
  const index  = findLastIndex(currentIndex, function(record) { return record[0] === currentSelectedDate; });
  const previousTradingDay = currentIndex[index]
  const lastSecondTradingDay = currentIndex[index - 1]
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      { isEmpty(currentSelectedDate) && isEmpty(currentSelectedIndex) ?
          <div className={classes.messageStyle}>Select a Index & Trading Date to generate Flight Book.</div>
        : isEmpty(currentSelectedDate)? 
          <div className={classes.messageStyle}>Select a Trading Date to generate Flight Book.</div>
        : isEmpty(currentSelectedIndex)? 
          <div className={classes.messageStyle}>Select a Index to generate Flight Book.</div>
        : index === -1 ? 
          <div className={classes.messageStyle}>Selected day is a Trading Holiday. Please select another date.</div>
        :
          <>
            <PreviousDay previousTradingDay={previousTradingDay} indexName={indicesName[currentSelectedIndex]}/>
            <br/>
            <br/>
            <PivotTwoDayRelation previousTradingDay={previousTradingDay} lastSecondTradingDay={lastSecondTradingDay}/>
            <br/>
            <br/>
            <CamarillaTwoDayRelation previousTradingDay={previousTradingDay} lastSecondTradingDay={lastSecondTradingDay}/>
            <br/>
            <br/>
            <PivotRange previousTradingDay={previousTradingDay}/>
            <br/>
            <br/>
            <CamarillaRange previousTradingDay={previousTradingDay}/>
            <br/>
            <br/>
          </>
      }
    </TableContainer>
  );
}
