const mongoose = require('mongoose');

const trimSchema = new mongoose.Schema({
    model_id: {
        type: String,
        required: [true, 'Please tell model id!']
      },
    model_make_id: {
      type: String,
      required: [true, 'Please tell model make id!']
    },
    model_name: {
      type: String,
      required: [true, 'Please tell model name!']
    },
    model_trim: {
        type: String,
        required: [true, 'Please tell model trim!'],
    },
    model_year: {
        type: String,
        required: [true, 'Please tell model String!']
    },
    model_body: {
        type: String
    },  
    model_engine_position: {
      type: String
    }, 
    model_engine_cc: {
      type: String
    },
    model_engine_cyl: {
      type: String
    },
    model_engine_type: {
      type: String
    },
    model_engine_valves_per_cyl: {
      type: String
    },
    model_engine_power_ps: {
      type: String
    },
    model_engine_power_rpm: {
      type: String
    },
    model_engine_torque_nm: {
      type: String
    },
    model_engine_torque_rpm: {
      type: String
    },
    model_engine_bore_mm: {
      type: String
    },
    model_engine_stroke_mm: {
      type: String
    },
    model_engine_compression: {
      type: String
    },
    model_engine_fuel: {
      type: String
    },
    model_top_speed_kph: {
      type: String
    },
    model_0_to_100_kph: {
      type: String
    },
    model_drive: {
      type: String
    },
    model_transmission_type: {
      type: String
    },
    model_seats: {
      type: String
    },
  });

const Trim = mongoose.model('Trim', trimSchema);

module.exports = Trim;