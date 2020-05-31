import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { keys } from 'lodash'
import Chips from './Chips';
 
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const HotStock = ({ buttonName }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

const allStocks = useSelector(state => state.allNiftyStocks)

const dateIndex = allStocks["ADANIPORTS.NS"].length - 1
const allKeys = keys(allStocks)

const sidewaysStocks = allKeys.filter(key => allStocks[key][dateIndex].pivotTwoDayRelationship[1].value === "Wide(Trading Range, Sideways day)")
const breakoutStocks = allKeys.filter(key => allStocks[key][dateIndex].pivotTwoDayRelationship[1].value === "Narrow(Breakout/Double Distribution Day)")
const moderateStocks = allKeys.filter(key => allStocks[key][dateIndex].pivotTwoDayRelationship[1].value === "Moderate(Typical, Exp Typical day)")

  return (
    <div style={{ display: 'inline' }}>
      <span onClick={handleClickOpen}>
        {buttonName}
      </span>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Hot Stocks
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" color="primary">Breakout Stocks</Typography>
          <Chips stocks={breakoutStocks} stockType={"primary"}/>
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h6" color="primary">Moderate Stocks</Typography>
          <Chips stocks={moderateStocks} stockType={"default"}/>
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h6" color="primary">Sideways Stocks</Typography>
          <Chips stocks={sidewaysStocks} stockType={"secondary"}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HotStock
