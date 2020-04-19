import { all } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'
import { ADD_NIFTY_INDEX, ADD_ERROR, INITIAL_LOAD } from './constants'
import Api from './api'


export function* fetchNiftyIndices() {
  const { response, error } = yield call(Api.fetchNiftyIndices)
  if (response) {
    yield put({ type: ADD_NIFTY_INDEX, payload: response })
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
