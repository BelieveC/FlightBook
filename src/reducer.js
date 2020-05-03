import { combineReducers } from 'redux'

import { ADD_NIFTY_INDEX, ADD_ERROR, ADD_CURRENT_SELECTED_DATE } from './constants'

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

const currentSelectedDate = (state = null, action) => {
  switch(action.type) {
    case ADD_CURRENT_SELECTED_DATE:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  nifty,
  currentSelectedDate
})
