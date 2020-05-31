import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import Chip from '@material-ui/core/Chip';

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
            avatar={<ShowChartIcon/>}
            label={stock}
            color={stockType}
          />
        ))
      }
    </div>
  );
}

export default Chips
