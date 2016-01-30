'use strict'

let FeedParser = require('feedparser')
let request = require('request-promise')
let express = require('express')
let app = express()

app.get('/lm/news.json', (req, res) => {
  let feedParser = new FeedParser()
  let num = 5
  let items = []
  request('https://english.kyodonews.jp/rss/news.xml').pipe(feedParser)
  feedParser.on('readable', () => {
    if (num-- <= 0) {
      let data = {}
      data.frames = items.map((item, i) => {
        return {
          index: i,
          text: item.title,
          icon: 'a1278'
        }
      })
      res.json(data)
      return
    }
    let item = feedParser.read()
    if (item) {
      items.push(item)
    }
  })
})

app.listen(3000, () => {
  console.log('listening to port 3000')
})
