import Ajax from './utils/Ajax'

const Api = {
  fetchNiftyIndices(indexSymbol) {
    // Alpha Vantage uses different symbols for indices
    // Convert index symbols to Alpha Vantage format
    let alphaSymbol = indexSymbol;
    
    // Map index symbols
    if (indexSymbol === '^IXIC') {
      // NASDAQ Composite - use QQQ ETF as proxy
      alphaSymbol = 'QQQ';
    } else if (indexSymbol === '^GSPC') {
      // S&P 500 - use SPY ETF as proxy
      alphaSymbol = 'SPY';
    } else if (indexSymbol === 'NIFTY.NS') {
      // Nifty 50 - Alpha Vantage doesn't support NSE indices directly
      // We'll use a workaround or placeholder
      alphaSymbol = 'NIFTY50.BSE';
    } else if (indexSymbol === 'BANKNIFTY.NS') {
      // Bank Nifty
      alphaSymbol = 'BANKNIFTY.BSE';
    } else if (indexSymbol.endsWith('.NS')) {
      // Indian stocks - remove .NS suffix and add .BSE
      alphaSymbol = indexSymbol.replace('.NS', '.BSE');
    }
    
    // Alpha Vantage TIME_SERIES_DAILY endpoint
    const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${alphaSymbol}&outputsize=compact&apikey=${apiKey}`;
    
    return Ajax.get(url)
      .then(response => {
        // Transform Alpha Vantage response to match expected format
        if (response['Error Message'] || response['Note']) {
          throw new Error(response['Error Message'] || 'API call frequency limit reached');
        }
        
        const timeSeries = response['Time Series (Daily)'];
        if (!timeSeries) {
          throw new Error('No data available for symbol: ' + indexSymbol);
        }
        
        // Convert to Finnhub-like format
        const dates = Object.keys(timeSeries).sort();
        const result = {
          c: [], // close prices
          h: [], // high prices
          l: [], // low prices
          o: [], // open prices
          t: [], // timestamps
          v: [], // volumes
          s: 'ok'
        };
        
        // Get last 60 trading days (approximately 2 months)
        const recentDates = dates.slice(-60);
        
        recentDates.forEach(date => {
          const dayData = timeSeries[date];
          const timestamp = new Date(date).getTime() / 1000;
          
          result.c.push(parseFloat(dayData['4. close']));
          result.h.push(parseFloat(dayData['2. high']));
          result.l.push(parseFloat(dayData['3. low']));
          result.o.push(parseFloat(dayData['1. open']));
          result.t.push(timestamp);
          result.v.push(parseInt(dayData['5. volume'] || 0));
        });
        
        return { response: result };
      })
      .catch(error => {
        console.error('API Error:', error);
        return { error: error.message || 'Failed to fetch data' };
      });
  }
}

export default Api