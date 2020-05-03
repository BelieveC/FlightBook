import Ajax from './utils/Ajax'

const Api = {
  fetchNiftyIndices() {
    const endDate = new Date()
    const endDateUnix = parseInt(endDate.getTime()/1000).toFixed(0)
    const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth() + 1, endDate.getDate())
    const startDateUnix = parseInt(startDate.getTime()/1000).toFixed(0)

    return Ajax.get(`https://finnhub.io/api/v1/stock/candle?symbol=NIFTY.NS&resolution=D&from=${startDateUnix}&to=${endDateUnix}&token=${process.env.REACT_APP_ACCESS_TOKEN}`)
                    .then(response => ({ response }))
                    .catch(error => ({ error }))
  }
}

export default Api
