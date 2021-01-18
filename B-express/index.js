const express = require('express')
const app = express()
const port = 4001

app.get('/', (req, res) => {
  setTimeout(() => res.send('Hello World!'), 3 * 1000)
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
