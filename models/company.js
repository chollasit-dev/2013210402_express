const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    address: {
      Province: String,
    }
  },{collection: "setting"});

const company = mongoose.model("setting", companySchema)

module.exports = company