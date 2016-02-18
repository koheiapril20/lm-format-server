'use strict'

let FeedParser = require('feedparser')
let request = require('request-promise')
let express = require('express')
let app = express()

app.get('/lm/news.json', (req, res) => {
  let feedParser = new FeedParser()
  let num = 5
  let items = []
  request({
    method: 'GET',
    uri: 'http://www.japantoday.com/feed',
    headers: {
      'User-Agent': 'nodejs'
    }
  }).pipe(feedParser)
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

app.get('/lm/splatoon.json', (req, res) => {
  request({
    method: 'GET',
    uri: 'https://splatoon.ink/schedule.json',
    transform: JSON.parse
  }).then((schedule) => {
    let data = { frames: [] }
    data.frames[0] = {
      index: 0,
      text: 'R: ' + schedule.schedule[0].regular.maps.map((map) => { return map.nameEN }).join(' / '),
      icon: 'a1278'
    }
    data.frames[1] = {
      index: 0,
      text: 'G: ' + schedule.schedule[0].ranked.maps.map((map) => { return map.nameEN }).join(' / '),
      icon: 'a1278'
    }
    res.json(data)
  })
})

app.listen(3000, () => {
  console.log('listening to port 3000')
})
