const BASE_PATH = '/api'

// const get = path => new Promise(resolve =>
//   fetch(BASE_PATH + path)
//     .then(stream => stream.json())
//     .then(data => resolve(data))
//     .catch(error => {
//       throw new Error(`API ${error}`)
//     })
// )

const send = (method, path, requestData = null) => new Promise(resolve =>
  fetch(BASE_PATH + path, {
    method,
    headers: Object.assign({ 'Content-Type': 'application/json' },
      'token' in window.localStorage ? { 'Authorization': 'Token ' + window.localStorage.token } : {}),
    body: requestData === null ? null : JSON.stringify(requestData)
  })
    .then(stream => stream.json())
    .then(responseData => resolve(responseData))
    .catch(error => {
      throw new Error(`API ${error}`)
    })
)

const get = (path) => send('GET', path)

const post = (path, data) => send('POST', path, data)

const patch = (path, data) => send('PATCH', path, data)

const _delete = (path) => new Promise((resolve, reject) =>
  fetch(BASE_PATH + path, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        resolve()
      } else {
        reject(response.statusText)
      }
    })
    .catch(error => {
      throw new Error(`API ${error}`)
    })
)

export { get, post, patch, _delete }
