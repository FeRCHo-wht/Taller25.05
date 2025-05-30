const { mutationResolvers } = require('./mutationResolvers');
const { queryResolvers } = require('./queryResolvers');

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};