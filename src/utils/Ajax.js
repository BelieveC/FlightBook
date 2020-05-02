import Request from 'superagent'

const TIMEOUT_THRESHOLD = 60000

const headers = () => ({
  accept: 'application/json'
  // 'Content-Type': 'application/json'
})

const Ajax = {
  get(route, params = {}, timeout = TIMEOUT_THRESHOLD) {
    return new Promise((resolve, reject) => {
      Request.get(route)
        .set(headers())
        .timeout(timeout)
        .query(params)
        .end((err, res) => {
          if (err || !res.ok) {
            const reason =
              res && res.body
                ? res.body.message || res.body
                : err.message || err
            reject(reason)
          } else {
            resolve(res.body)
          }
        })
    })
  },

  put(route, data, timeoutThreshold = TIMEOUT_THRESHOLD) {
    return new Promise((resolve, reject) => {
      Request.put(route)
        .send(data)
        .set(headers())
        .timeout(timeoutThreshold)
        .end((err, res) => {
          if (err || !res.ok) {
            const reason =
              res && res.body
                ? res.body.message || res.body
                : err.message || err
            reject(reason)
          } else {
            resolve(res.body)
          }
        })
    })
  },

  post(
    route,
    data,
    additionalHeaders = {},
    timeoutThreshold = TIMEOUT_THRESHOLD
  ) {
    const defaultHeaders = headers()
    const apiHeaders = { ...defaultHeaders, ...additionalHeaders }
    return new Promise((resolve, reject) => {
      Request.post(route)
        .send(data)
        .set(apiHeaders)
        .timeout(timeoutThreshold)
        .end((err, res) => {
          if (err || !res.ok) {
            const reason =
              res && res.body
                ? res.body.message || res.body
                : err.message || err
            reject(reason)
          } else {
            resolve(res.body)
          }
        })
    })
  },

  patch(
    route,
    data,
    additionalHeaders = {},
    timeoutThreshold = TIMEOUT_THRESHOLD
  ) {
    const defaultHeaders = headers()
    const apiHeaders = { ...defaultHeaders, ...additionalHeaders }
    return new Promise((resolve, reject) => {
      Request.patch(route)
        .send(data)
        .set(apiHeaders)
        .timeout(timeoutThreshold)
        .end((err, res) => {
          if (err || !res.ok) {
            const reason =
              res && res.body
                ? res.body.message || res.body
                : err.message || err
            reject(reason)
          } else {
            resolve(res.body)
          }
        })
    })
  },

  delete(
    route,
    additionalHeaders = {},
    timeoutThreshold = TIMEOUT_THRESHOLD,
    data = {}
  ) {
    const defaultHeaders = headers()
    const apiHeaders = { ...defaultHeaders, ...additionalHeaders }
    return new Promise((resolve, reject) => {
      Request.del(route)
        .set(apiHeaders)
        .timeout(timeoutThreshold)
        .send(data)
        .end((err, res) => {
          if (err || !res.ok) {
            const reason =
              res && res.body
                ? res.body.message || res.body
                : err.message || err
            reject(reason)
          } else {
            resolve(res.body)
          }
        })
    })
  }
}

export default Ajax
