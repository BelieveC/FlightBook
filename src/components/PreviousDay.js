import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles, StyledTableRow, StyledTableCell } from './styles'

const createRows = (previousTradingDay) => {
  return [
    {'name': 'Open', 'value': parseFloat( previousTradingDay.open).toFixed(2)},
    {'name': 'High', 'value': parseFloat( previousTradingDay.high).toFixed(2)},
    {'name': 'Low', 'value': parseFloat( previousTradingDay.low).toFixed(2)},
    {'name': 'Close', 'value': parseFloat( previousTradingDay.close).toFixed(2)}
  ]
}

export default function PreviousDay({ previousTradingDay, indexName }) {
  const classes = useStyles();

  const rows = createRows(previousTradingDay[1])
  const previousDate = new Date(previousTradingDay[0])

  return (
    <>
    <div className={classes.headerStyle}>{`${indexName} Range for ${previousDate.toDateString()}`} </div>
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
