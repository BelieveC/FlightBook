import React from 'react'
import { Provider } from 'react-redux'
import { INITIAL_LOAD } from './constants'
import rootSaga from './sagas'
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

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
  store.dispatch({ type: INITIAL_LOAD })
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
