const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    model_make_id: {
        type: String,
        required: [true, 'Please tell make_id!']
      },
    model_name: {
        type: String,
        required: [true, 'Please tell make year!']
    },  
    
  });

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;