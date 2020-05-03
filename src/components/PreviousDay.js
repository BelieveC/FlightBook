import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { useStyles, StyledTableRow, StyledTableCell } from './styles'

const createRows = (previousTradingDay) => {
  return [
    {'name': 'Open', 'value': previousTradingDay.open},
    {'name': 'High', 'value': previousTradingDay.high},
    {'name': 'Low', 'value': previousTradingDay.low},
    {'name': 'Close', 'value': previousTradingDay.close}
  ]
}

export default function PreviousDay() {
  const classes = useStyles();

  const nifty50 = useSelector(state => state.nifty)
  const previousTradingDay = nifty50[nifty50.length - 1]
  const rows = createRows(previousTradingDay[1])
  const previousDate = new Date(previousTradingDay[0])
  return (
    <>
    <div className={classes.headerStyle}>{`Previous Range for ${previousDate.toDateString()}`} </div>
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
