import Ajax from './utils/Ajax'

const SYMBOL_MAPPING = {
  '^IXIC': 'QQQ',
  '^GSPC': 'SPY',
  'NIFTY.NS': 'NIFTY50.BSE',
  'BANKNIFTY.NS': 'BANKNIFTY.BSE'
}

const ALPHA_VANTAGE_FIELDS = {
  OPEN: '1. open',
  HIGH: '2. high',
  LOW: '3. low',
  CLOSE: '4. close',
  VOLUME: '5. volume'
}

const TRADING_DAYS_LIMIT = 60

class ApiClient {
  constructor() {
    this.apiKey = process.env.REACT_APP_ALPHA_VANTAGE_KEY
    this.baseUrl = 'https://www.alphavantage.co/query'
  }

  validateApiKey() {
    if (!this.apiKey) {
      throw new Error('Alpha Vantage API key is not configured')
    }
  }

  transformSymbol(indexSymbol) {
    if (!indexSymbol) {
      throw new Error('Symbol is required')
    }

    if (SYMBOL_MAPPING[indexSymbol]) {
      return SYMBOL_MAPPING[indexSymbol]
    }

    if (indexSymbol.endsWith('.NS')) {
      return indexSymbol.replace('.NS', '.BSE')
    }

    return indexSymbol
  }

  buildUrl(symbol) {
    return `${this.baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${this.apiKey}`
  }

  validateApiResponse(response) {
    if (response['Error Message']) {
      throw new Error(response['Error Message'])
    }
    
    if (response['Note']) {
      throw new Error('API call frequency limit reached')
    }

    const timeSeries = response['Time Series (Daily)']
    if (!timeSeries) {
      throw new Error('No time series data available')
    }

    return timeSeries
  }

  transformToFinnhubFormat(timeSeries) {
    const dates = Object.keys(timeSeries).sort()
    const recentDates = dates.slice(-TRADING_DAYS_LIMIT)
    
    const result = {
      c: [],
      h: [],
      l: [],
      o: [],
      t: [],
      v: [],
      s: 'ok'
    }

    recentDates.forEach(date => {
      const dayData = timeSeries[date]
      const timestamp = new Date(date).getTime() / 1000
      
      result.c.push(parseFloat(dayData[ALPHA_VANTAGE_FIELDS.CLOSE]))
      result.h.push(parseFloat(dayData[ALPHA_VANTAGE_FIELDS.HIGH]))
      result.l.push(parseFloat(dayData[ALPHA_VANTAGE_FIELDS.LOW]))
      result.o.push(parseFloat(dayData[ALPHA_VANTAGE_FIELDS.OPEN]))
      result.t.push(timestamp)
      result.v.push(parseInt(dayData[ALPHA_VANTAGE_FIELDS.VOLUME] || 0))
    })

    return result
  }

  async fetchNiftyIndices(indexSymbol) {
    try {
      this.validateApiKey()
      const alphaSymbol = this.transformSymbol(indexSymbol)
      const url = this.buildUrl(alphaSymbol)
      
      const response = await Ajax.get(url)
      const timeSeries = this.validateApiResponse(response)
      const transformedData = this.transformToFinnhubFormat(timeSeries)
      
      return { response: transformedData }
    } catch (error) {
      console.error(`API Error for symbol ${indexSymbol}:`, error)
      return { error: error.message || 'Failed to fetch data' }
    }
  }
}

const Api = new ApiClient()

export default Api