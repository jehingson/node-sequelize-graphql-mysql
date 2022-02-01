const {GraphQLDateTime} = require('graphql-iso-date');
const userResolver = require('./user');
const postResolver = require('./post');
const fileResolver = require('./file');

const customScalarResolver = {
    Date: GraphQLDateTime,
  };

module.exports = [customScalarResolver, userResolver,  postResolver, fileResolver]