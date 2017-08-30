import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';
import {resolver} from 'graphql-sequelize';
import topicType from '../types/topic';
import {Topic} from '../../models';

const PER_PAGE = 20

const topics = {
    type: new GraphQLList(topicType),
    args: {
        page: {
            type: GraphQLInt
        }
    },
    resolve: resolver(Topic, {
        before: (options, args) => {
            options.where = options.where || {}
            options.limit = PER_PAGE,
            options.offset = (args.page - 1)*PER_PAGE

            return options
        }
    })
};

const topic = {
    type: topicType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: resolver(Topic)
}

export default {
    topics,
    topic
}