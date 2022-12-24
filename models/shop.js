const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
    name:  { type: String, required: true, trim: true }, // name: String | String is shorthand for {type: String}
    photo: { type: String, default: 'nopic.png' },
    location: {
        lat: Number,
        lgn: Number,
    },
    // createdAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },    //Mongoose Auto-Created: createdAt, updateAt
  },{
    timestamps: true,
    collection: "shops",
});

const shop = mongoose.model("Shop", shopSchema)

module.exports = shop
