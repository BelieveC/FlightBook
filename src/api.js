import Ajax from './utils/Ajax'

const Api = {
  fetchNiftyIndices() {
    // return Ajax.get('https://finnhub.io/api/v1/quote?symbol=NIFTY.NS&token=bq0b7tvrh5rddd65fppg')
    //                 .then(response => ({ response }))
    //                 .catch(error => ({ error }))
    return Ajax.get('https://www.nseindia.com/api/allIndices')
                    .then(response => ({ response }))
                    .catch(error => ({ error }))
  }
}

export default Api
