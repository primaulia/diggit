import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import {resolver} from 'graphql-sequelize';
import {Topic} from '../../models/'

export default new GraphQLObjectType({
  name: 'Topic',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    title: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
  }
});