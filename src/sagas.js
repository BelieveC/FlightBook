import { all } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'
import { ADD_NIFTY_INDEX, ADD_BANK_NIFTY_INDEX, ADD_ERROR, INITIAL_LOAD } from './constants'
import { isTodaySessionOver, formatDate, formatResult } from './utils/helper'
import Api from './api'

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
