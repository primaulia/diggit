module.exports = {};

module.exports.topicsUrl = "/api/v1/topics";

module.exports.topicUrl = function(topicId){
  return "/api/v1/topics/"+topicId
};