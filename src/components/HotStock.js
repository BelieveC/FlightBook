import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { keys, isEmpty } from 'lodash'
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
  let breakoutAdvanceStocks = []
  let moderateAdvanceStocks = []
  let sidewaysAdvanceStocks = []

  if(!isEmpty(allStocks) && allStocks["ADANIPORTS.NS"] && allStocks["ADANIPORTS.NS"].length > 0){
    const dateIndex = allStocks["ADANIPORTS.NS"].length - 1
    const allKeys = keys(allStocks)
  
    const sidewaysStocks = allKeys.filter(key => 
      allStocks[key] && allStocks[key][dateIndex] && 
      allStocks[key][dateIndex].pivotTwoDayRelationship && 
      allStocks[key][dateIndex].pivotTwoDayRelationship[1] &&
      allStocks[key][dateIndex].pivotTwoDayRelationship[1].value === "Wide(Trading Range, Sideways day)")
    const breakoutStocks = allKeys.filter(key => 
      allStocks[key] && allStocks[key][dateIndex] && 
      allStocks[key][dateIndex].pivotTwoDayRelationship && 
      allStocks[key][dateIndex].pivotTwoDayRelationship[1] &&
      allStocks[key][dateIndex].pivotTwoDayRelationship[1].value === "Narrow(Breakout/Double Distribution Day)")
    const moderateStocks = allKeys.filter(key => 
      allStocks[key] && allStocks[key][dateIndex] && 
      allStocks[key][dateIndex].pivotTwoDayRelationship && 
      allStocks[key][dateIndex].pivotTwoDayRelationship[1] &&
      allStocks[key][dateIndex].pivotTwoDayRelationship[1].value === "Moderate(Typical, Exp Typical day)")
  
    breakoutStocks.map(stock => {
      let count = 0
      for (let index = dateIndex; index > Math.max(0, dateIndex - 5); index--) {
        if(allStocks[stock] && allStocks[stock][index] && 
           allStocks[stock][index].pivotTwoDayRelationship && 
           allStocks[stock][index].pivotTwoDayRelationship[1] &&
           allStocks[stock][index].pivotTwoDayRelationship[1].value === "Narrow(Breakout/Double Distribution Day)"){
          count += 1
        }
        else if(allStocks[stock] && allStocks[stock][index] && 
                allStocks[stock][index].pivotTwoDayRelationship && 
                allStocks[stock][index].pivotTwoDayRelationship[1] &&
                allStocks[stock][index].pivotTwoDayRelationship[1].value === "Moderate(Typical, Exp Typical day)"){
          count += 0.5
        }
      }
      let buyCount = 0
      if(allStocks[stock] && allStocks[stock][dateIndex] && 
         allStocks[stock][dateIndex][1] && allStocks[stock][dateIndex][1].close) {
        buyCount = parseInt(45000/allStocks[stock][dateIndex][1].close).toFixed(0)
      }
      breakoutAdvanceStocks.push({stockName: stock, strength: count, buyCount: buyCount})
      return true
    })
  
    moderateStocks.map(stock => {
      let count = 0
      for (let index = dateIndex; index > Math.max(0, dateIndex - 5); index--) {
        if(allStocks[stock] && allStocks[stock][index] && 
           allStocks[stock][index].pivotTwoDayRelationship && 
           allStocks[stock][index].pivotTwoDayRelationship[1] &&
           allStocks[stock][index].pivotTwoDayRelationship[1].value === "Moderate(Typical, Exp Typical day)"){
          count += 1
        }
        else if(allStocks[stock] && allStocks[stock][index] && 
                allStocks[stock][index].pivotTwoDayRelationship && 
                allStocks[stock][index].pivotTwoDayRelationship[1] &&
                allStocks[stock][index].pivotTwoDayRelationship[1].value === "Wide(Trading Range, Sideways day)"){
          count += 0.5
        }
      }
      let buyCount = 0
      if(allStocks[stock] && allStocks[stock][dateIndex] && 
         allStocks[stock][dateIndex][1] && allStocks[stock][dateIndex][1].close) {
        buyCount = parseInt(45000/allStocks[stock][dateIndex][1].close).toFixed(0)
      }
      moderateAdvanceStocks.push({stockName: stock, strength: count, buyCount: buyCount})
      return true
    })
  
    sidewaysStocks.map(stock => {
      let count = 0
      for (let index = dateIndex; index > Math.max(0, dateIndex - 5); index--) {
        if(allStocks[stock] && allStocks[stock][index] && 
           allStocks[stock][index].pivotTwoDayRelationship && 
           allStocks[stock][index].pivotTwoDayRelationship[1] &&
           allStocks[stock][index].pivotTwoDayRelationship[1].value === "Wide(Trading Range, Sideways day)"){
          count += 1
        }
        else if(allStocks[stock] && allStocks[stock][index] && 
                allStocks[stock][index].pivotTwoDayRelationship && 
                allStocks[stock][index].pivotTwoDayRelationship[1] &&
                allStocks[stock][index].pivotTwoDayRelationship[1].value === "Narrow(Breakout/Double Distribution Day)"){
          count -= 0.5
        }
      }
      let buyCount = 0
      if(allStocks[stock] && allStocks[stock][dateIndex] && 
         allStocks[stock][dateIndex][1] && allStocks[stock][dateIndex][1].close) {
        buyCount = parseInt(45000/allStocks[stock][dateIndex][1].close).toFixed(0)
      }
      sidewaysAdvanceStocks.push({stockName: stock, strength: count, buyCount: buyCount})
      return true
    })
  }

  // console.log("Breakout: ", breakoutAdvanceStocks)
  // console.log("Moderate: ", moderateAdvanceStocks)
  // console.log("Sideways: ", sidewaysAdvanceStocks)

  return (
      isEmpty(allStocks) ? <div style={{ display: 'inline' }}> Made </div> :
      <div style={{ display: 'inline' }}>
        <span onClick={handleClickOpen}>
          {buttonName}
        </span>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md">
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Hot Stocks
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6" color="primary">Breakout Stocks</Typography>
            <Chips stocks={breakoutAdvanceStocks} stockType={"primary"}/>
          </DialogContent>
          <DialogContent dividers>
            <Typography variant="h6" color="primary">Moderate Stocks</Typography>
            <Chips stocks={moderateAdvanceStocks} stockType={"default"}/>
          </DialogContent>
          <DialogContent dividers>
            <Typography variant="h6" color="primary">Sideways/Trending Stocks</Typography>
            <Chips stocks={sidewaysAdvanceStocks} stockType={"secondary"}/>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default HotStock
