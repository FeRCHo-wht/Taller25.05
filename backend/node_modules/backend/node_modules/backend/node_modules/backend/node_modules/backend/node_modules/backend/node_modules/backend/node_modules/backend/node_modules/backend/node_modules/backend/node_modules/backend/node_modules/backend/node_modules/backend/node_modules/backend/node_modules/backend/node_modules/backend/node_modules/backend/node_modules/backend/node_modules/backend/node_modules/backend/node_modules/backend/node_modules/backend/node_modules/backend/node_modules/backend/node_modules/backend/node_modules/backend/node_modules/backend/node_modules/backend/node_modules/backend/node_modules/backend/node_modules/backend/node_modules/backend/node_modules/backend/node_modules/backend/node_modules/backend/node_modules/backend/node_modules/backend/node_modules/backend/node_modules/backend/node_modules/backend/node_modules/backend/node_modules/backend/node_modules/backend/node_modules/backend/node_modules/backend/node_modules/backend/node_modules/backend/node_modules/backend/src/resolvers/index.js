const { mutationResolvers } = require('./mutationResolvers');
const { queryResolvers } = require('./queryResolvers');

module.exports = {
  Mutation: mutationResolvers,
  Query: queryResolvers,
};