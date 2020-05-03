import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import PreviousDay from './PreviousDay'
import PivotRange from './PivotRange'
import CamarillaRange from './CamarillaRange'
import { useSelector } from 'react-redux';
import { isEmpty, findLastIndex } from 'lodash'
import { useStyles } from './styles'

export default function FlightCard() {
  const currentSelectedDate = useSelector(state => state.currentSelectedDate)
  const nifty50 = useSelector(state => state.nifty)

  const index  = findLastIndex(nifty50, function(record) { return record[0] === currentSelectedDate; });
  const previousTradingDay = nifty50[index]
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      { isEmpty(currentSelectedDate) ?
          <div className={classes.headerStyle}>Select a Trading Date to generate Flight Book.</div>
        : index === -1 ? 
          <div className={classes.headerStyle}>Selected day is a Trading Holiday. Please select another date.</div>
        :
          <>
            <PreviousDay index={index} previousTradingDay={previousTradingDay}/>
            <br/>
            <br/>
            <PivotRange index={index} previousTradingDay={previousTradingDay}/>
            <br/>
            <br/>
            <CamarillaRange index={index} previousTradingDay={previousTradingDay}/>
            <br/>
            <br/>
          </>
      }
    </TableContainer>
  );
}
