import { all } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'
import { ADD_NIFTY_INDEX, ADD_ERROR, INITIAL_LOAD } from './constants'
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
  var result = {}
  for(var i = 0; i < data.t.length; i++)
  {
    var currentDate = new Date(data.t[i]*1000)
    result[formatDate(currentDate)] = { 'open': data.o[i], 'high': data.h[i], 'close': data.c[i], 'low': data.l[i] }
  }
  return result
}

export function* fetchNiftyIndices() {
  const { response, error } = yield call(Api.fetchNiftyIndices)
  if (response) {
    var result = formatResult(response)
    var today = formatDate(new Date())
    localStorage.setItem(today, JSON.stringify(result))
    yield put({ type: ADD_NIFTY_INDEX, payload: result })
  } else {
    yield put({ type: ADD_ERROR, payload: error })
  }
}

export function* initialLoad() {
  yield call(fetchNiftyIndices)
}

export function* mainSagas() {
  yield [
    yield takeLatest(INITIAL_LOAD, initialLoad),
  ]
}

export default function* rootSaga() {
  yield all([mainSagas()])
}
