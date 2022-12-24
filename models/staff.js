const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
    name:  {type: String, required: true, trim: true}, // name: String | String is shorthand for {type: String}
    salary: {type: Number},
    created: {type: Date, default: Date.now}
  },{collection: "staffs"});

const staff = mongoose.model("Staff", staffSchema)

module.exports = staff