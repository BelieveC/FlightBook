import React from 'react'
import { Provider } from 'react-redux'
import { INITIAL_LOAD, ADD_NIFTY_INDEX, ADD_BANK_NIFTY_INDEX, ADD_ALL_NIFTY_STOCKS } from './constants'
import rootSaga from './sagas'
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { isEmpty } from 'lodash'
import { isTodaySessionOver, formatDate } from './utils/helper'
import Main from './components/Main'

const App = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  if (
    process.env.NODE_ENV === 'development'
  ) {
    const logger = createLogger({ logErrors: true })
    middlewares.push(logger)
  }
  const store = createStore(reducer, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)

  var today = formatDate(new Date())
  var nifty50Cache = localStorage.getItem(`${today}_nifty50`)
  var bankNiftyCache = localStorage.getItem(`${today}_banknifty`)
  var allNiftyStocksCache = localStorage.getItem(`${today}_allNiftyStocks`)
  var afterSessionReload = localStorage.getItem(`${today}_after_session_reload`)

  if((isEmpty(afterSessionReload) && isTodaySessionOver()) || isEmpty(nifty50Cache) || isEmpty(bankNiftyCache))
  {
    localStorage.clear()
    store.dispatch({ type: INITIAL_LOAD })
  }
  else{
    store.dispatch({ type: ADD_NIFTY_INDEX, payload: JSON.parse(nifty50Cache) })
    store.dispatch({ type: ADD_BANK_NIFTY_INDEX, payload: JSON.parse(bankNiftyCache) })
    store.dispatch({ type: ADD_ALL_NIFTY_STOCKS, payload: JSON.parse(allNiftyStocksCache) })
  }

  window.store = store
  return (
    <Provider store={store}>
      <div className="App">
        <Main/>
      </div>
    </Provider>
  )
}

export default App
