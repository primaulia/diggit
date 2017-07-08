var {topics} = require('../db')

class Topic {
    constructor(content) {
      this.content = content
      this.votes = 0
      this.id = topics.length + 1
      this.createdAt = new Date()
    }
}

function getTopicById(id) {
  return topics.filter(topic => topic.id == id)[0]
}

function getResponse(page) {
  const start = (page - 1)*20
  const end = page*20
  let response = {
    data: {
      topics: topics.slice(start, end),
      pages: Math.ceil(topics.length/20),
      count: topics.length
    }
  }

  return response
}

module.exports = {
  getTopics(req, res, next) {
    res.status(200).json(getResponse(req.query.page || 1))
  },
  
  addTopic(req, res, next) {
    let content = req.body.content
    let topic = new Topic(content)
    topics.sort((a, b) => {
      if (a.votes === b.votes) {
        return ((b.id - a.id)/100)
      }
      return b.votes - a.votes
    })
    let page = Math.ceil(topics.indexOf(topic)/20)
    page = page == 0 ? 1 : page
    let response = getResponse(page)
    response.data.topics.unshift(topic)
    res.status(200).json(response)
    topics.push(topic)
  },

  updownvote(req, res, next) {
    let topic = getTopicById(req.params.id)
    if (topic) {
      topic.votes += req.body.votes
    }
    topics.sort((a, b) => {
      if (a.votes === b.votes) {
        return ((b.id - a.id)/100)
      }
      return b.votes - a.votes
    })
    res.status(200).end()
  }
};