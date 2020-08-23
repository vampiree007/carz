const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

///////////////////////////////////////////
// + User Routes Available to Every User///
///////////////////////////////////////////
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// + Auto Verification Route Using Cookies For use By FrontEnd
router.get('/verify', authController.protect, authController.verify);

//////////////////////////////////////////////////
// + User Routes Available Only To Login Users////
//////////////////////////////////////////////////
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);


// Restrict all routes after this middleware to Admins
router.use(authController.protect);
router.use(authController.restrictTo('admin'));


////////////////////////////////////////////////////
// + User Routes Available Only to the Admin User///
///////////////////////////////////////////////////

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
