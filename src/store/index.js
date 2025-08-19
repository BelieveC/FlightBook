import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootSaga from '../sagas'
import reducer from '../reducer'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ logErrors: true })
    middlewares.push(logger)
  }
  
  const store = createStore(reducer, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)
  
  if (process.env.NODE_ENV === 'development') {
    window.store = store
  }
  
  return store
}