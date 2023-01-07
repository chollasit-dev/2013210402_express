const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config/index');

const staffSchema = new Schema({
    name:  {type: String, required: true, trim: true}, // name: String | String is shorthand for {type: String}
    salary: {type: Number},
    photo: { type: String, default: config.DOMAIN + 'nopic.png' },
    created: {type: Date, default: Date.now}
  },{collection: "staffs"});

const staff = mongoose.model("Staff", staffSchema)

module.exports = staff
