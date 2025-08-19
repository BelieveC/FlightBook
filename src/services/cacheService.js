import { isEmpty } from 'lodash'
import { formatDate, isTodaySessionOver } from '../utils/helper'

class CacheService {
  constructor() {
    this.today = formatDate(new Date())
  }

  getCacheKeys() {
    return {
      nifty50: `${this.today}_nifty50`,
      bankNifty: `${this.today}_banknifty`,
      allNiftyStocks: `${this.today}_allNiftyStocks`,
      nasdaq: `${this.today}_nasdaq`,
      sp500: `${this.today}_sp500`,
      allUsStocks: `${this.today}_allUsStocks`,
      afterSessionReload: `${this.today}_after_session_reload`
    }
  }

  getCache(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  setCache(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  clearCache() {
    localStorage.clear()
  }

  shouldLoadFreshData() {
    const keys = this.getCacheKeys()
    const afterSessionReload = localStorage.getItem(keys.afterSessionReload)
    const nifty50Cache = localStorage.getItem(keys.nifty50)
    const bankNiftyCache = localStorage.getItem(keys.bankNifty)
    
    return (isEmpty(afterSessionReload) && isTodaySessionOver()) || 
           isEmpty(nifty50Cache) || 
           isEmpty(bankNiftyCache)
  }

  getCachedData() {
    const keys = this.getCacheKeys()
    
    return {
      nifty50: this.getCache(keys.nifty50),
      bankNifty: this.getCache(keys.bankNifty),
      allNiftyStocks: this.getCache(keys.allNiftyStocks),
      nasdaq: this.getCache(keys.nasdaq),
      sp500: this.getCache(keys.sp500),
      allUsStocks: this.getCache(keys.allUsStocks)
    }
  }
}

export default new CacheService()