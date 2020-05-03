import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
  headerStyle: {
    padding: '2vh',
    fontSize: '3vh',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  messageStyle: {
    padding: '2vh',
    fontSize: '2vh',
    color: 'rgba(0, 0, 0, 0.54)'
  }
});

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
    fontSize: '2vh'
  },
  body: {
    fontSize: '2vh',
  }
}))(TableCell);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);