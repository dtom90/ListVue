const path = require('path')
const express = require('express')
const app = express()

const port = 5000
const baseUrl = process.env.BASE_URL || '/'
const staticDir = baseUrl === '/ListVue/' ? 'dist_gh_pages' : 'dist'

app.use(baseUrl, express.static(path.join(__dirname, staticDir)))

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Serving ListVue at http://localhost:${port}${baseUrl}`))
