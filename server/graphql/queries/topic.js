import {
  GraphQLList
} from 'graphql';
import {resolver} from 'graphql-sequelize';
import topicType from '../types/topic';
import {Topic} from '../../models';

const topics = {
    type: new GraphQLList(topicType),
    args: {},
    resolve: resolver(Topic)
};

export default {
    topics
}