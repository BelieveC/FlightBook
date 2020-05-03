import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { useStyles, StyledTableRow, StyledTableCell } from './styles'

const createRows = (previousTradingDay) => {
  const { high, low, close } = previousTradingDay
  // {debugger}
  // Central Pivot Range
  var pivot =  parseInt((high + low + close)/3.0)
  var bc =  parseInt((high + low)/2.0)
  var tc =  parseInt(2*pivot - bc)

  if(bc > tc){
    var tmp = tc
    tc = bc
    bc = tmp
  }

  // Resistances
  var r1 = parseInt(2*pivot - low)
  var r2 = parseInt(pivot + high - low)
  var r3 = parseInt(r1 + high - low )
  var r4 = parseInt(r3 + r2 - r1)

  // Supports
  var s1 = parseInt(2*pivot - high)
  var s2 = parseInt(pivot - (high - low))
  var s3 = parseInt(s1 - (high - low))
  var s4 = parseInt(s3 - (s1 - s2) )

  return [
    {'name': 'Resistance 4', 'value': r4},
    {'name': 'Resistance 3', 'value': r3},
    {'name': 'Resistance 2', 'value': r2},
    {'name': 'Resistance 1', 'value': r1},
    {'name': 'Top Pivot', 'value': tc},
    {'name': 'Cetral Pivot', 'value': pivot},
    {'name': 'Bottom Pivot', 'value': bc},
    {'name': 'Support 1', 'value': s1},
    {'name': 'Support 2', 'value': s2},
    {'name': 'Support 3', 'value': s3},
    {'name': 'Support 4', 'value': s4},
  ]
}

export default function PivotRange() {
  const classes = useStyles();

  const nifty50 = useSelector(state => state.nifty)
  const previousTradingDay = nifty50[nifty50.length - 1]
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
