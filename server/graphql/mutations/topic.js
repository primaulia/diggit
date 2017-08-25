import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';
import {resolver} from 'graphql-sequelize';
import topicController from '../../controllers/topicController';
import topicType from '../types/topic';
import {Topic} from '../../models';

const resolverFn = resolver(Topic)

const addTopic = {
  type: topicType,
  args: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    }
  },
  resolve: (parentValue, { title, content, url }, request, info) => {
    return topicController.addTopicByData(title, url, content).then((model) => {
      return resolverFn(parentValue, { id: model.id }, request, info)
    })
  }
}

const updownvote = {
  type: topicType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    votesAdjustment: {
      type: GraphQLInt,
    }
  },
  resolve: (parentValue, { id, votesAdjustment }, request, info) => {
    return topicController.updownvoteByData(id, votesAdjustment).then(() => {
      return resolverFn(parentValue, { id }, request, info)
    })
  }
}

export default {
  addTopic,
  updownvote
}