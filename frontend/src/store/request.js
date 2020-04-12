
const get = path => new Promise(resolve =>
  fetch(path)
    .then(stream => stream.json())
    .then(data => resolve(data))
    .catch(error => {
      throw new Error(`API ${error}`)
    })
)

const send = (method, path, requestData) => new Promise(resolve =>
  fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  })
    .then(stream => stream.json())
    .then(responseData => resolve(responseData))
    .catch(error => {
      throw new Error(`API ${error}`)
    })
)

const post = (path, data) => send('POST', path, data)

const patch = (path, data) => send('PATCH', path, data)

export { get, post, patch }
