import { all } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'
import { ADD_NIFTY_INDEX, ADD_BANK_NIFTY_INDEX, ADD_ERROR, INITIAL_LOAD } from './constants'
import { isTodaySessionOver } from './utils/helper'
import Api from './api'

export const formatDate = (date) => {
  var month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const formatResult = (data) => {
  var result = []
  for(var i = 0; i < data.t.length; i++)
  {
    var currentDate = new Date(data.t[i]*1000)
    result.push([formatDate(currentDate), { 'open': data.o[i], 'high': data.h[i], 'close': data.c[i], 'low': data.l[i] }])
  }
  return result
}

export function* fetchNifty50() {
  const { response, error } = yield call(Api.fetchNifty50)
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
  const { response, error } = yield call(Api.fetchBankNifty)
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

export function* initialLoad() {
  yield call(fetchNifty50)
  yield call(fetchBankNifty)
}

export function* mainSagas() {
  yield [
    yield takeLatest(INITIAL_LOAD, initialLoad),
  ]
}

export default function* rootSaga() {
  yield all([mainSagas()])
}
