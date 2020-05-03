import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles, StyledTableRow, StyledTableCell } from './styles'


const camarillaValues = (tradingDay) => {
  const { high, low, close } = tradingDay
  var range = high - low

  // H's
  var h3 = close + (range * 1.1/4)

  // L's
  var l3 = close - (range * 1.1/4)

  return {
    'h3': parseFloat(h3),
    'l3': parseFloat(l3)
  }
}

const createRows = (previousTradingDay, lastSecondTradingDay) => {
  const previousCamarillaValues = camarillaValues(previousTradingDay)
  const lastSecondCamarillaValues = camarillaValues(lastSecondTradingDay)
  var dayType = 'Not Defined';
  if(previousCamarillaValues.h3 > lastSecondCamarillaValues.h3){
    if(previousCamarillaValues.l3 > lastSecondCamarillaValues.h3) {
      dayType = 'Bullish'
    }
    else if(previousCamarillaValues.l3 >= lastSecondCamarillaValues.l3 &&  previousCamarillaValues.l3 < lastSecondCamarillaValues.h3){
      dayType = 'Moderately Bullish'
    }
    else if(previousCamarillaValues.l3 < lastSecondCamarillaValues.l3)
    {
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousCamarillaValues.l3 < lastSecondCamarillaValues.l3){
    if(previousCamarillaValues.h3 < lastSecondCamarillaValues.l3) {
      dayType = 'Bearish'
    }
    else if(previousCamarillaValues.h3 >= lastSecondCamarillaValues.l3 &&  previousCamarillaValues.h3 < lastSecondCamarillaValues.h3){
      dayType = 'Moderately Bearish'
    }
    else if(previousCamarillaValues.h3 >  lastSecondCamarillaValues.h3){
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousCamarillaValues.l3 >= lastSecondCamarillaValues.l3 && previousCamarillaValues.h3 <= lastSecondCamarillaValues.h3){
     dayType = 'Inside Value(Breakout)'
  }

  var cprWidth = previousCamarillaValues.h3 - previousCamarillaValues.l3;
  var cprWidthType = 'Not Defined'
  if(cprWidth < 75){
    cprWidthType = 'Narrow(Breakout/Double Distribution day)'
  }
  else if(cprWidth > 75 && cprWidth < 140){
    cprWidthType = 'Moderate(Typical, Exp Typical day)'
  }
  else{
    cprWidthType = 'Wide(Trading Range, Sideways day)'
  }
  return [
    { name: 'Expected Day', 'value': dayType },
    { name: 'Camarilla width', 'value': cprWidthType }
  ]
}

export default function CamarillaTwoDayRelation({ previousTradingDay, lastSecondTradingDay}) {
  const classes = useStyles();

  const rows = createRows(previousTradingDay[1], lastSecondTradingDay[1])
  return (
    <>
    <div className={classes.headerStyle}>Two day Camarilla based relationship</div>
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
