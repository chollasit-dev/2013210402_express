const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    address: {
      Province: String,
    }
  },{collection: "companies"});

const company = mongoose.model("companies", companySchema)

module.exports = company