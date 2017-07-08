var express = require('express');
var router = express.Router();
var topicController = require('../controllers/topicController');

router.get('/topics', topicController.getTopics);

router.post('/topics', topicController.addTopic)

router.patch('/topics/:id', topicController.updownvote)

module.exports = router;
