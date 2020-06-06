import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Chips = ({stocks, stockType}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        stocks.map(stock => (
          <Chip
            key={stock.stockName}
            avatar={<Avatar sizes="large">{stock.strength}</Avatar>}
            label={`${stock.stockName}(${stock.buyCount})`}
            color={stockType}
            variant="outlined"
          />
        ))
      }
    </div>
  );
}

export default Chips
