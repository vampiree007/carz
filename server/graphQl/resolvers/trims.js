const Trim = require('../../models/trim.model');
const {protectGql, restrictToAdmin} = require('../../controllers/qqlAuthController');

// Subscriptions
const POST_ADDED = 'POST_ADDED';

// Queries
const allTrims = async(parent, args, {req, res}) =>{
    await protectGql(req)
    const post = await Trim.find();
    return post
}
const eightTrims = async(parent, args, {req, res}) =>{
    await protectGql(req);
    const post = await Trim.find().limit(4).sort({"_id":-1});
    return post
}
const modelTrims = async(parent, args, {req, res}) =>{
    await protectGql(req)
    const post = await Trim.find(args)
    return post
}
// Mutations
const createTrim = async(parent, args, { req, pubsub }) =>{
    await protectGql(req);
    restrictToAdmin(req)
    const post = await Trim.create(args.input)
    //publish
    pubsub.publish(POST_ADDED, { postAdded: post });

    return post
}
const deleteTrim = async(parent, args, {req, res}) =>{
    await protectGql(req);
    restrictToAdmin(req)
    const post = await Trim.findByIdAndDelete(args.input.id)

    return post
}

// module exports
module.exports = {
    Query: {
        allTrims,
        modelTrims,
        eightTrims
    },
    Mutation: {
        createTrim,
        deleteTrim,
    },
    Subscription: {
        postAdded: {
            subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator([POST_ADDED])
        }
    }
}