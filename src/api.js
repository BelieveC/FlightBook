import Ajax from './utils/Ajax'

class ApiService {
  constructor() {
    this.apiKey = process.env.REACT_APP_ALPHA_VANTAGE_KEY
    this.baseUrl = 'https://www.alphavantage.co/query'
    this.symbolMapping = {
      '^IXIC': 'QQQ',
      '^GSPC': 'SPY',
      'NIFTY.NS': 'NIFTY50.BSE',
      'BANKNIFTY.NS': 'BANKNIFTY.BSE'
    }
  }

  mapSymbol(indexSymbol) {
    if (this.symbolMapping[indexSymbol]) {
      return this.symbolMapping[indexSymbol]
    }
    
    if (indexSymbol.endsWith('.NS')) {
      return indexSymbol.replace('.NS', '.BSE')
    }
    
    return indexSymbol
  }

  buildUrl(symbol) {
    return `${this.baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${this.apiKey}`
  }

  validateResponse(response, originalSymbol) {
    if (response['Error Message'] || response['Note']) {
      throw new Error(response['Error Message'] || 'API call frequency limit reached')
    }
    
    const timeSeries = response['Time Series (Daily)']
    if (!timeSeries) {
      throw new Error(`No data available for symbol: ${originalSymbol}`)
    }
    
    return timeSeries
  }

  transformToFinnhubFormat(timeSeries, daysLimit = 60) {
    const dates = Object.keys(timeSeries).sort()
    const recentDates = dates.slice(-daysLimit)
    
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
      
      result.c.push(parseFloat(dayData['4. close']))
      result.h.push(parseFloat(dayData['2. high']))
      result.l.push(parseFloat(dayData['3. low']))
      result.o.push(parseFloat(dayData['1. open']))
      result.t.push(timestamp)
      result.v.push(parseInt(dayData['5. volume'] || 0))
    })
    
    return result
  }

  async fetchNiftyIndices(indexSymbol) {
    try {
      const mappedSymbol = this.mapSymbol(indexSymbol)
      const url = this.buildUrl(mappedSymbol)
      
      const response = await Ajax.get(url)
      const timeSeries = this.validateResponse(response, indexSymbol)
      const transformedData = this.transformToFinnhubFormat(timeSeries)
      
      return { response: transformedData }
    } catch (error) {
      console.error('API Error:', error)
      return { error: error.message || 'Failed to fetch data' }
    }
  }
}

const Api = new ApiService()

export default Api