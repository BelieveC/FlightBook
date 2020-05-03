import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles, StyledTableRow, StyledTableCell } from './styles'


const pivotValues = (tradingDay) => {
  const { high, low, close } = tradingDay
  // Central Pivot Range
  var pivot =  (high + low + close)/3.0
  var bc =  (high + low)/2.0
  var tc =  2*pivot - bc

  if(bc > tc){
    var tmp = tc
    tc = bc
    bc = tmp
  }

  return {
    'tc': parseFloat(tc),
    'pivot': parseFloat(pivot),
    'bc': parseFloat(bc),
  }
}

const createRows = (previousTradingDay, lastSecondTradingDay) => {
  const previousPivotValues = pivotValues(previousTradingDay)
  const lastSecondTradingValues = pivotValues(lastSecondTradingDay)
  var dayType = 'Not Defined';
  if(previousPivotValues.tc > lastSecondTradingValues.tc){
    if(previousPivotValues.bc > lastSecondTradingValues.tc) {
      dayType = 'Bullish'
    }
    else if(previousPivotValues.bc >= lastSecondTradingValues.bc &&  previousPivotValues.bc < lastSecondTradingValues.tc){
      dayType = 'Moderately Bullish'
    }
    else if(previousPivotValues.bc < lastSecondTradingValues.bc)
    {
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousPivotValues.bc < lastSecondTradingValues.bc){
    if(previousPivotValues.tc < lastSecondTradingValues.bc) {
      dayType = 'Bearish'
    }
    else if(previousPivotValues.tc >= lastSecondTradingValues.bc &&  previousPivotValues.tc < lastSecondTradingValues.tc){
      dayType = 'Moderately Bearish'
    }
    else if(previousPivotValues.tc >  lastSecondTradingValues.tc){
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousPivotValues.bc >= lastSecondTradingValues.bc && previousPivotValues.tc <= lastSecondTradingValues.tc){
     dayType = 'Inside Value(Breakout)'
  }

  var cprWidth = previousPivotValues.tc - previousPivotValues.bc;
  var cprWidthType = 'Not Defined'
  if(cprWidth < 30){
    cprWidthType = 'Narrow(Breakout/Double Distribution Day)'
  }
  else if(cprWidth > 30 && cprWidth < 80){
    cprWidthType = 'Moderate(Typical, Exp Typical day)'
  }
  else{
    cprWidthType = 'Wide(Trading Range, Sideways day)'
  }
  return [
    { name: 'Expected Day', 'value': dayType },
    { name: 'CPR width', 'value': cprWidthType }
  ]
}

export default function PivotTwoDayRelation({ previousTradingDay, lastSecondTradingDay}) {
  const classes = useStyles();

  const rows = createRows(previousTradingDay[1], lastSecondTradingDay[1])
  return (
    <>
    <div className={classes.headerStyle}>Two day Pivot based relationship</div>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Reference Name</StyledTableCell>
          <StyledTableCell align="center">Value</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="center">{row.value}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
