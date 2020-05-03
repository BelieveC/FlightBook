import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles, StyledTableRow, StyledTableCell } from './styles'

const createRows = (previousTradingDay) => {
  const { high, low, close } = previousTradingDay
  // {debugger}
  // Central Pivot Range
  var pivot =  (high + low + close)/3.0
  var bc =  (high + low)/2.0
  var tc =  2*pivot - bc

  if(bc > tc){
    var tmp = tc
    tc = bc
    bc = tmp
  }

  // Resistances
  var r1 = 2*pivot - low
  var r2 = pivot + high - low
  var r3 = r1 + high - low
  var r4 = r3 + r2 - r1

  // Supports
  var s1 = 2*pivot - high
  var s2 = pivot - (high - low)
  var s3 = s1 - (high - low)
  var s4 = s3 - (s1 - s2)

  return [
    {'name': 'Resistance 4', 'value': parseFloat(r4).toFixed(2)},
    {'name': 'Resistance 3', 'value': parseFloat(r3).toFixed(2)},
    {'name': 'Resistance 2', 'value': parseFloat(r2).toFixed(2)},
    {'name': 'Resistance 1', 'value': parseFloat(r1).toFixed(2)},
    {'name': 'Top Pivot', 'value': parseFloat(tc).toFixed(2)},
    {'name': 'Cetral Pivot', 'value': parseFloat(pivot).toFixed(2)},
    {'name': 'Bottom Pivot', 'value': parseFloat(bc).toFixed(2)},
    {'name': 'Support 1', 'value': parseFloat(s1).toFixed(2)},
    {'name': 'Support 2', 'value': parseFloat(s2).toFixed(2)},
    {'name': 'Support 3', 'value': parseFloat(s3).toFixed(2)},
    {'name': 'Support 4', 'value': parseFloat(s4).toFixed(2)},
  ]
}

export default function PivotRange({ previousTradingDay }) {
  const classes = useStyles();

  const rows = createRows(previousTradingDay[1])
  return (
    <>
    <div className={classes.headerStyle}>Pivot Range</div>
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
