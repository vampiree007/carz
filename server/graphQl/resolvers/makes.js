const Make = require('../../models/makeModel');
const {protectGql} = require('../../controllers/qqlAuthController');

const allMakes = async(parent, args, {req, res}) =>{
    await protectGql(req)
    const allMakes = await Make.find();
    return allMakes
}
const totalMakes = async(parent, args, {req, res}) =>{
    await protectGql(req)
    const totalMakes = await Make.find().select('make_id make_display -_id');
    return totalMakes
}
const createMake = async(parent, args, {req, res}) =>{
    await protectGql(req)
    const post = await Make.create(args.input)
    return post
}
module.exports = {
    Query: {
        allMakes:allMakes,
        totalMakes: totalMakes
    },
    Mutation: {
        createMake
    }
}