const express = require('express')
const app = express()
const port = 3301

app.get('/', (req, res) => {
  setTimeout(() => res.send("Hello World! (from service A)"), 1 * 1000);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

