const Make = require('../models/makeModel');
const Model = require('../models/carmodelModel');
const Trim = require('../models/trim.model');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures')

// All Make Queries Are handles here
exports.getAllMakes = factory.getAll(Make);
exports.getMake = factory.getOne(Make);
exports.createMake = factory.createOne(Make);
exports.deleteMake = factory.deleteOne(Make);

// All Model Queries Are handles here
exports.getAllModels = factory.getAll(Model);
exports.getModel = factory.getOne(Model);
exports.createModel = factory.createOne(Model);
exports.deleteModel = factory.deleteOne(Model);

// All Trim Queries Are handles here
exports.getAllTrims = factory.getAll(Trim);
exports.getTrim = factory.getOne(Trim);
exports.createTrim = factory.createOne(Trim);
exports.deleteTrim = factory.deleteOne(Trim);

// Set Up of Advance Collection Query with Auto Collection Detection
exports.getModelData  = catchAsync(async (req, res, next) => {
    let model
    // 1. Setting Up model on the basis of CMD Value in req.query
    if (req.query.cmd.includes('Make')) model = Make
    if (req.query.cmd.includes('Model')) model = Model
    if (req.query.cmd.includes('Trim')) model = Trim

    // 2. API Feature will trim off CMD Value in the below step and add query functionalties
    const features = new APIFeatures(model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // 3. const doc = await features.query.explain();
    const doc = await features.query;
    // 4. SEND FILTERED RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
});