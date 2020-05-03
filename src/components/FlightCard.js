import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import PreviousDay from './PreviousDay'

export default function FlightCard() {
  return (
    <TableContainer component={Paper}>
      <PreviousDay/>
      <br/>
      <br/>
    </TableContainer>
  );
}
