const Model = require('../../models/carmodelModel');
const {protectGql, restrictToAdmin} = require('../../controllers/qqlAuthController');

// QUERIES
const allModels = async(parent, args, {req, res}) =>{
    await protectGql(req)
    const post = await Model.find();
    return post
}
const makeModels = async(parent, args, {req, res}) =>{
    await protectGql(req)
    const post = await Model.find(args)
    return post
}
// MUTATIONS
const createModel= async(parent, args, {req, res}) =>{
    await protectGql(req);
    restrictToAdmin(req);
    const post = await Model.create(args.input);
    return post
}
const updateModel = async(parent, args, {req, res}) =>{
    await protectGql(req);
    restrictToAdmin(req)
    const post = await Model.findByIdAndUpdate(args.input.id, args.input)
    return post
}
const deleteModel = async(parent, args, {req, res}) =>{
    await protectGql(req);
    restrictToAdmin(req)
    const post = await Model.findByIdAndDelete(args.input.id)
    return post
}

module.exports = {
    Query: {
        allModels,
        makeModels
    },
    Mutation: {
        createModel,
        updateModel,
        deleteModel,
    }
}