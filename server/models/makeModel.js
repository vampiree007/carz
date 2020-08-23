const mongoose = require('mongoose');

const makeSchema = new mongoose.Schema({
    make_id: {
        type: String,
        required: [true, 'Please tell make_id!']
      },
    make_display: {
      type: String,
      required: [true, 'Please tell make_display!']
    },
    make_is_common: {
        type: String,
        required: [true, 'Please tell if it!'],
        enum: [0, 1],
    },
    make_country: {
        type: String,
        required: [true, 'Please tell make country!']
      },
    make_year: {
        type: String,
        required: [true, 'Please tell make year!']
    },  
    
  });

const Make = mongoose.model('Make', makeSchema);

module.exports = Make;