import Ajax from 'ajax'
const nseHistoricalData = require("nse-historical-data");

const Api = {
  // fetchNiftyIndices() {
  //   return Ajax.get('http://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/liveIndexWatchData.json')
  //     .then(response => ({ response }))
  //     .catch(error => ({ error }))
  // }
  fetchNiftyIndices(date) {
    let options = {
      date: {
        start: "2020-04-16",
        end: "2020-04-17"
      }
    }
    nseHistoricalData.default(options).then(function(data) {
        console.log(JSON.stringify(data));
        return data;
      }).catch(function(err) {
        console.error(err);
        return err;
      });
    // return Ajax.get('http://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/liveIndexWatchData.json')
    //   .then(response => ({ response }))
    //   .catch(error => ({ error }))
  }
}

export default Api
