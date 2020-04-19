import { combineReducers } from 'redux'

import { ADD_NIFTY_INDEX, ADD_ERROR } from './constants'

const initialState = {}

const nifty = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NIFTY_INDEX:
      return action.payload
    case ADD_ERROR:
      return action.payload
    default:
      return state
  }
}


export default combineReducers({
  nifty
})
