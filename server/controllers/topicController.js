var {topics} = require('../db')
const defaultPerPage = 20 //default to 20 per page

class Topic {
    constructor(content) {
      this.content = content
      this.votes = 0
      this.id = topics.length + 1
      this.createdAt = new Date()
    }
}

function getTopicById(id) {
  // return first topic with matching id
  return topics.filter(topic => topic.id == id)[0]
}

function getResponse(page = 1, perPage = defaultPerPage) {
  // Page is one-indexed
  const start = (page - 1)*perPage
  const end = page*perPage
  let response = {
    data: {
      topics: topics.slice(start, end),
      pages: Math.ceil(topics.length/perPage),
      count: topics.length
    }
  }

  return response
}

module.exports = {
  getTopics(req, res, next) {
    res.status(200).json(getResponse(req.query.page, req.query.limit))
  },
  
  addTopic(req, res, next) {
    const content = req.body.content
    if (content === undefined) {
      res.status(400).send({ error: 'Content is not specified.' })
      return
    }
    
    // Convert content to string
    const topic = new Topic(content+"")
    topics.push(topic)
    topics.sort((a, b) => {
      if (a.votes === b.votes) {
        // Vote count holds a higher priority in sorting
        return ((b.id - a.id)/100)
      }
      return b.votes - a.votes
    })
    
    const perPage = req.query.limit || defaultPerPage
    let page = Math.ceil(topics.indexOf(topic)/perPage)
    // First item is index 0
    page = page === 0 ? 1 : page
    
    let response = getResponse(page, perPage)
    res.status(200).json(response)
  },

  updownvote(req, res, next) {
    const topic = getTopicById(req.params.id)
    const votes = req.body.votes
    
    if (topic && votes && Number.isInteger(votes)) {
      topic.votes += votes
    } else {
      console.log(votes)
      if (topic === undefined) {
        res.status(400).send({ error: 'Specified id is not valid.' })
      } else if (votes === undefined) {
        res.status(400).send({ error: 'Votes count is not specified.' })
      } else {
        res.status(400).send({ error: 'Votes count is invalid.' })
      }
      return
    }
    
    topics.sort((a, b) => {
      if (a.votes === b.votes) {
        return ((b.id - a.id)/100)
      }
      return b.votes - a.votes
    })
    
    res.status(200).json(topic)
  }
};