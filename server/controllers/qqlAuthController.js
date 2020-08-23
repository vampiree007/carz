const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.protectGql = async (req, res, next = (f)=>f) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookie) {
        if (req.cookie.jwt) token = req.cookie.jwt;
    }else{
      token = req.headers.cookie.split('=')[1]
    }
    if (!token) {
      throw new Error('You are not logged in! Please log in to get access.');
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return
      throw new Error('unauthorized person')
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        throw new Error('You recently changed password! Please log in again.')
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    return 
  };

exports.restrictToAdmin = (req, res, next) => {
      // roles ['admin', 'lead-guide']. role='user'
      console.log(req.user.role)
      if (req.user.role === 'user') {
          throw new Error('You do not have permission to perform this action', 403)
      }
      return
};