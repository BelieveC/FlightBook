import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  headerStyle: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.54)'
  }
});

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
    fontSize: 25
  },
  body: {
    fontSize: 20,
  }
}))(TableCell);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);