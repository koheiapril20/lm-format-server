'use strict'

let express = require('express')
let app = express()

app.get('/lm/news.json', (req, res) => {
  let sample = ['this', 'is', 'a test!']
  let data = {}
  data.frames = sample.map((text, i) => {
    return {
      index: i,
      text: text,
      icon: 'a1278'
    }
  })
  res.json(data)
})

app.listen(3000, () => {
  console.log('listening to port 3000')
})
