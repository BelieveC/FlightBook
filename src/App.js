import React from 'react'
import { Provider } from 'react-redux'
import { 
  INITIAL_LOAD, ADD_NIFTY_INDEX, ADD_BANK_NIFTY_INDEX, ADD_ALL_NIFTY_STOCKS,
  ADD_NASDAQ_INDEX, ADD_SP500_INDEX, ADD_ALL_US_STOCKS
} from './constants'
import { configureStore } from './store'
import cacheService from './services/cacheService'
import { isEmpty } from 'lodash'
import Main from './components/Main'

const loadCachedData = (store) => {
  const cachedData = cacheService.getCachedData()
  
  if (!isEmpty(cachedData.nifty50)) {
    store.dispatch({ type: ADD_NIFTY_INDEX, payload: cachedData.nifty50 })
  }
  if (!isEmpty(cachedData.bankNifty)) {
    store.dispatch({ type: ADD_BANK_NIFTY_INDEX, payload: cachedData.bankNifty })
  }
  if (!isEmpty(cachedData.allNiftyStocks)) {
    store.dispatch({ type: ADD_ALL_NIFTY_STOCKS, payload: cachedData.allNiftyStocks })
  }
  if (!isEmpty(cachedData.nasdaq)) {
    store.dispatch({ type: ADD_NASDAQ_INDEX, payload: cachedData.nasdaq })
  }
  if (!isEmpty(cachedData.sp500)) {
    store.dispatch({ type: ADD_SP500_INDEX, payload: cachedData.sp500 })
  }
  if (!isEmpty(cachedData.allUsStocks)) {
    store.dispatch({ type: ADD_ALL_US_STOCKS, payload: cachedData.allUsStocks })
  }
}

const App = () => {
  const store = configureStore()
  
  if (cacheService.shouldLoadFreshData()) {
    cacheService.clearCache()
    store.dispatch({ type: INITIAL_LOAD })
  } else {
    loadCachedData(store)
  }

  return (
    <Provider store={store}>
      <div className="App">
        <Main/>
      </div>
    </Provider>
  )
}

export default App
