const Topic = require('../models').Topic
const sequelize = require('sequelize')

module.exports = {
  getTopics(req, res, next) {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    let count = 0
    
    Topic
      .findAndCountAll()
      .then(result => {
        count = result.count
        return Topic
          .findAll({
            limit,
            offset: (page-1)*limit,
            order: [['votes', 'DESC']]
          })
      })
      .then(topics => {
        res.status(200).json({
          data: {
            topics,
            count,
            pages: count/limit
          }
        })
      })
      .catch(error => {
        res.status(400).send(error)
      })
  },

  getTopic(req, res, next) {
    const id = req.params.id
    Topic
      .findById(id)
      .then(topic => {
        if (topic) {
          res.status(200).send(topic)
        } else {
          res.status(400).send({ error: 'Topic with id not found.' })
        }
      })
      .catch(error => {
        res.status(400).send(error)
      })
  },

  addTopic(req, res, next) {
    const title = req.body.title
    const url = req.body.url
    const content = req.body.content
    Topic
      .create({
        title,
        url,
        content
      })
      .then(topic => {
        res.status(200).send(topic)
      })
      .catch(error => {
        res.status(400).send(error)
      })
  },

  addTopicByData(title, url, content){
    return Topic
      .create({
        title,
        url,
        content
      })
      .catch(error => {
        console.log(error)
      })
  },

  updownvote(req, res, next) {
    const id = req.params.id
    const votesAdjustment = req.body.votes
    Topic
      .update({
        votes: sequelize.literal(`votes + ${votesAdjustment}`)
      },{
        where: { id }
      })
      .then(() => {
        return Topic.findById(id)
      })
      .then(topic => {
        res.status(200).send(topic)
      })
      .catch(error => {
        res.status(400).send(error)
      })
  },

  updownvoteByData(id, votesAdjustment) {
    return Topic
      .update({
        votes: sequelize.literal(`votes + ${votesAdjustment}`)
      },{
        where: { id }
      })
      .then(() => {
        return Topic.findById(id)
      })
      .catch(error => {
        console.log(error)
      })
  }
}