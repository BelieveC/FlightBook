import { all } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'
import { 
  ADD_NIFTY_INDEX, ADD_BANK_NIFTY_INDEX, ADD_ERROR, CLEAR_ERROR, SET_LOADING, 
  INITIAL_LOAD, ALL_NIFTY_STOCKS, ADD_ALL_NIFTY_STOCKS,
  ADD_NASDAQ_INDEX, ADD_SP500_INDEX, ADD_ALL_US_STOCKS, ALL_US_STOCKS, INITIAL_LOAD_US
} from './constants'
import { isTodaySessionOver, formatDate, formatResult } from './utils/helper'
import Api from './api'
import { delay } from 'redux-saga/effects'

export function* fetchNifty50() {
  const { response, error } = yield call(Api.fetchNiftyIndices, 'NIFTY.NS')
  if (response) {
    var result = formatResult(response)
    var today = formatDate(new Date())
    localStorage.setItem(`${today}_nifty50`, JSON.stringify(result))
    if(isTodaySessionOver()){
      localStorage.setItem(`${today}_after_session_reload`, 'true')
    }
    yield put({ type: ADD_NIFTY_INDEX, payload: result })
  } else {
    yield put({ type: ADD_ERROR, payload: error })
  }
}

export function* fetchBankNifty() {
  const { response, error } = yield call(Api.fetchNiftyIndices, 'BANKNIFTY.NS')
  if (response) {
    var result = formatResult(response)
    var today = formatDate(new Date())
    localStorage.setItem(`${today}_banknifty`, JSON.stringify(result))
    if(isTodaySessionOver()){
      localStorage.setItem(`${today}_after_session_reload`, 'true')
    }
    yield put({ type: ADD_BANK_NIFTY_INDEX, payload: result })
  } else {
    yield put({ type: ADD_ERROR, payload: error })
  }
}

export function* fetchNasdaq() {
  const { response, error } = yield call(Api.fetchNiftyIndices, '^IXIC')
  if (response) {
    var result = formatResult(response)
    var today = formatDate(new Date())
    localStorage.setItem(`${today}_nasdaq`, JSON.stringify(result))
    yield put({ type: ADD_NASDAQ_INDEX, payload: result })
  } else {
    yield put({ type: ADD_ERROR, payload: error })
  }
}

export function* fetchSP500() {
  const { response, error } = yield call(Api.fetchNiftyIndices, '^GSPC')
  if (response) {
    var result = formatResult(response)
    var today = formatDate(new Date())
    localStorage.setItem(`${today}_sp500`, JSON.stringify(result))
    yield put({ type: ADD_SP500_INDEX, payload: result })
  } else {
    yield put({ type: ADD_ERROR, payload: error })
  }
}

export function* fetchAllUSStocks() {
  var result = {}
  var hasErrors = false
  for (let index = 0; index < ALL_US_STOCKS.length; index++) {
    const stockSym = ALL_US_STOCKS[index];
    
    // Add delay to avoid rate limiting (Alpha Vantage allows 5 calls per minute)
    if (index > 0 && index % 4 === 0) {
      yield delay(13000); // Wait 13 seconds after every 4 calls
    }
    
    var { response, error } = yield call(Api.fetchNiftyIndices, stockSym)
    if (response) {
      result[stockSym] = formatResult(response)
    } else {
      hasErrors = true
      console.error(`Failed to fetch data for ${stockSym}:`, error)
    }
  }
  
  if (!hasErrors && Object.keys(result).length > 0) {
    var today = formatDate(new Date())
    localStorage.setItem(`${today}_allUsStocks`, JSON.stringify(result))
    yield put({ type: ADD_ALL_US_STOCKS, payload: result })
  } else if (hasErrors) {
    yield put({ type: ADD_ERROR, payload: { message: 'Failed to fetch some US stock data. Please check your API key.' } })
  }
}

export function* fetchAllNiftyStocks() {
  var result = {}
  var hasErrors = false
  for (let index = 0; index < ALL_NIFTY_STOCKS.length; index++) {
    const stockSym = ALL_NIFTY_STOCKS[index];
    
    // Add delay to avoid rate limiting (Alpha Vantage allows 5 calls per minute)
    if (index > 0 && index % 4 === 0) {
      yield delay(13000); // Wait 13 seconds after every 4 calls
    }
    
    var { response, error } = yield call(Api.fetchNiftyIndices, stockSym)
    if (response) {
      result[stockSym] = formatResult(response)
    } else {
      hasErrors = true
      console.error(`Failed to fetch data for ${stockSym}:`, error)
    }
  }
  
  if (!hasErrors && Object.keys(result).length > 0) {
    var today = formatDate(new Date())
    localStorage.setItem(`${today}_allNiftyStocks`, JSON.stringify(result))
    if(isTodaySessionOver()){
      localStorage.setItem(`${today}_after_session_reload`, 'true')
    }
    yield put({ type: ADD_ALL_NIFTY_STOCKS, payload: result })
  } else if (hasErrors) {
    yield put({ type: ADD_ERROR, payload: { message: 'Failed to fetch some stock data. Please check your API key.' } })
  }
}

export function* initialLoad() {
  try {
    yield put({ type: SET_LOADING, payload: true })
    yield put({ type: CLEAR_ERROR })
    
    yield call(fetchNifty50)
    yield call(fetchBankNifty)
    yield call(fetchAllNiftyStocks)
    
    yield put({ type: SET_LOADING, payload: false })
  } catch (error) {
    console.error('Error during initial load:', error)
    yield put({ type: ADD_ERROR, payload: { message: 'Failed to load Indian market data. Please check your connection and API key.' } })
    yield put({ type: SET_LOADING, payload: false })
  }
}

export function* initialLoadUS() {
  try {
    yield put({ type: SET_LOADING, payload: true })
    yield put({ type: CLEAR_ERROR })
    
    yield call(fetchNasdaq)
    yield call(fetchSP500)
    yield call(fetchAllUSStocks)
    
    yield put({ type: SET_LOADING, payload: false })
  } catch (error) {
    console.error('Error during US market load:', error)
    yield put({ type: ADD_ERROR, payload: { message: 'Failed to load US market data. Please check your connection and API key.' } })
    yield put({ type: SET_LOADING, payload: false })
  }
}

export function* mainSagas() {
  yield [
    yield takeLatest(INITIAL_LOAD, initialLoad),
    yield takeLatest(INITIAL_LOAD_US, initialLoadUS),
  ]
}

export default function* rootSaga() {
  yield all([mainSagas()])
}
