const BASE_PATH = '/api'

const send = (method, path, requestData = null) => new Promise((resolve, reject) =>
  fetch(BASE_PATH + path, {
    method,
    headers: Object.assign({ 'Content-Type': 'application/json' },
      'token' in window.localStorage ? { 'Authorization': 'Token ' + window.localStorage.token } : {}),
    body: requestData === null ? null : JSON.stringify(requestData)
  })
    .then(response => {
      if (response.ok) {
        return response
      }
      throw response
    })
    .then(stream => stream.json())
    .then(json => resolve(json))
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error)
      reject(error)
    })
)

const get = (path) => send('GET', path)

const post = (path, data) => send('POST', path, data)

const patch = (path, data) => send('PATCH', path, data)

const _delete = (path) => send('DELTE', path)

export { get, post, patch, _delete }
