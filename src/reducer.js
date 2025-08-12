import { combineReducers } from 'redux'

import { 
  ADD_NIFTY_INDEX, ADD_ALL_NIFTY_STOCKS, ADD_ERROR, CLEAR_ERROR, SET_LOADING, 
  ADD_CURRENT_SELECTED_DATE, ADD_BANK_NIFTY_INDEX, ADD_CURRENT_SELECTED_INDEX,
  SET_SELECTED_MARKET, ADD_NASDAQ_INDEX, ADD_SP500_INDEX, ADD_ALL_US_STOCKS 
} from './constants'

const nifty = (state = [], action) => {
  switch (action.type) {
    case ADD_NIFTY_INDEX:
      return action.payload
    default:
      return state
  }
}

const bankNifty = (state = [], action) => {
  switch (action.type) {
    case ADD_BANK_NIFTY_INDEX:
      return action.payload
    default:
      return state
  }
}

const allNiftyStocks = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_NIFTY_STOCKS:
      return action.payload
    default:
      return state
  }
}

const currentSelectedDate = (state = null, action) => {
  switch(action.type) {
    case ADD_CURRENT_SELECTED_DATE:
      return action.payload
    default:
      return state
  }
}

const currentSelectedIndex = (state = null, action) => {
  switch(action.type) {
    case ADD_CURRENT_SELECTED_INDEX:
      return action.payload
    default:
      return state
  }
}

const selectedMarket = (state = 'INDIAN', action) => {
  switch(action.type) {
    case SET_SELECTED_MARKET:
      return action.payload
    default:
      return state
  }
}

const nasdaq = (state = [], action) => {
  switch (action.type) {
    case ADD_NASDAQ_INDEX:
      return action.payload
    default:
      return state
  }
}

const sp500 = (state = [], action) => {
  switch (action.type) {
    case ADD_SP500_INDEX:
      return action.payload
    default:
      return state
  }
}

const allUsStocks = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_US_STOCKS:
      return action.payload
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return action.payload
    case CLEAR_ERROR:
      return null
    default:
      return state
  }
}

export default combineReducers({
  nifty,
  bankNifty,
  allNiftyStocks,
  currentSelectedDate,
  currentSelectedIndex,
  selectedMarket,
  nasdaq,
  sp500,
  allUsStocks,
  loading,
  error
})
