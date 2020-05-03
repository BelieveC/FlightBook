import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles, StyledTableRow, StyledTableCell } from './styles'

const createRows = (previousTradingDay) => {
  const { high, low, close } = previousTradingDay
  var range = high - low

  // H's
  var h1 = close + (range * 1.1/12)
  var h2 = close + (range * 1.1/6)
  var h3 = close + (range * 1.1/4)
  var h4 = close + (range * 1.1/2)
  var h5 = (high/low) * close

  // L's
  var l1 = close - (range * 1.1/12)
  var l2 = close - (range * 1.1/6)
  var l3 = close - (range * 1.1/4)
  var l4 = close - (range * 1.1/2)
  var l5 = 2*close - h5
  

  return [
    {'name': 'H5(Breakout Target)', 'value': parseFloat(h5).toFixed(2)},
    {'name': 'H4(Bullish Breakout)', 'value': parseFloat(h4).toFixed(2)},
    {'name': 'H3(Sell Reversal)', 'value': parseFloat(h3).toFixed(2)},
    {'name': 'H2', 'value': parseFloat(h2).toFixed(2)},
    {'name': 'H1', 'value': parseFloat(h1).toFixed(2)},
    {'name': 'L1', 'value': parseFloat(l1).toFixed(2)},
    {'name': 'L2', 'value': parseFloat(l2).toFixed(2)},
    {'name': 'L3(Buy Reversal)', 'value': parseFloat(l3).toFixed(2)},
    {'name': 'L4(Bearish Breakout)', 'value': parseFloat(l4).toFixed(2)},
    {'name': 'L5(Breakout Target)', 'value': parseFloat(l5).toFixed(2)}
  ]
}

export default function CamarillaRange({ index, previousTradingDay }) {
  const classes = useStyles();

  const rows = createRows(previousTradingDay[1])
  return (
    <>
    <div className={classes.headerStyle}>Camarilla Range</div>
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
