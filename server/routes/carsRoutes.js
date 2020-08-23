const express = require('express');
const carsController = require('./../controllers/carsController');//All Data Passed in to This//
const authController = require('./../controllers/authController');//Security Handle Controller//

const router = express.Router();

// Protect all routes after this middleware//
router.use(authController.protect);

/////////////////////////////////////////////
// + All Make Collection Related Routes Here
/////////////////////////////////////////////
router
    .route('/makes')
    .get(carsController.getAllMakes)
    .post(carsController.createMake)

router
    .route('/makes/:id')
    .get(carsController.getMake)
    .delete(authController.restrictTo('admin'), carsController.deleteMake);

//////////////////////////////////////////////
// + All Model Collection Related Routes Here
//////////////////////////////////////////////
router
    .route('/models')
    .get(carsController.getAllModels)
    .post(carsController.createModel)

router
    .route('/models/:id')
    .get(carsController.getModel)
    .delete(authController.restrictTo('admin'), carsController.deleteModel);

/////////////////////////////////////////////
// + All Trim Collection Related Routes Here
/////////////////////////////////////////////
router
    .route('/trims')
    .get(carsController.getAllTrims)
    .post(carsController.createTrim)

router
    .route('/trims/:id')
    .get(carsController.getTrim)
    .delete(authController.restrictTo('admin'), carsController.deleteTrim);

   
/////////////////////////////////////////
// + CMD based Advance Query Setup Here
/////////////////////////////////////////
router.get('/details',carsController.getModelData);

module.exports = router;