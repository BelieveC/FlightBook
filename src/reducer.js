import { combineReducers } from 'redux'

import { ADD_NIFTY_INDEX, ADD_ALL_NIFTY_STOCKS, ADD_ERROR, ADD_CURRENT_SELECTED_DATE, ADD_BANK_NIFTY_INDEX, ADD_CURRENT_SELECTED_INDEX } from './constants'

const nifty = (state = [], action) => {
  switch (action.type) {
    case ADD_NIFTY_INDEX:
      return action.payload
    case ADD_ERROR:
      return action.payload
    default:
      return state
  }
}

const bankNifty = (state = [], action) => {
  switch (action.type) {
    case ADD_BANK_NIFTY_INDEX:
      return action.payload
    case ADD_ERROR:
      return action.payload
    default:
      return state
  }
}

const allNiftyStocks = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_NIFTY_STOCKS:
      return action.payload
    case ADD_ERROR:
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

export default combineReducers({
  nifty,
  bankNifty,
  allNiftyStocks,
  currentSelectedDate,
  currentSelectedIndex
})
