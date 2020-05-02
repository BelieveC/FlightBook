import React from 'react'
import { Provider } from 'react-redux'
import { INITIAL_LOAD, ADD_NIFTY_INDEX } from './constants'
import rootSaga from './sagas'
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { formatDate } from './sagas'
import { isEmpty } from 'lodash'

const App = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_REDUX_LOGGER === 'true'
  ) {
    const logger = createLogger({ logErrors: true })
    middlewares.push(logger)
  }
  const store = createStore(reducer, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)

  var today = formatDate(new Date())
  var cache = localStorage.getItem(today)
  if(isEmpty(cache)){
    store.dispatch({ type: INITIAL_LOAD })
  }
  else{
    store.dispatch({ type: ADD_NIFTY_INDEX, payload: JSON.parse(cache) })
  }

  window.store = store
  return (
    <Provider store={store}>
      <div className="App">
        <div>Hello World</div>
      </div>
    </Provider>
  )
}

export default App
