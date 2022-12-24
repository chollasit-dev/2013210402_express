const mongoose = require('mongoose');
const { schema } = require('./company');
const Schema = mongoose.Schema

const shopSchema = new Schema({
    name:  { type: String, required: true, trim: true }, // name: String | String is shorthand for {type: String}
    photo: { type: String, default: 'nopic.png' },
    location: {
        lat: Number,
        lgn: Number,
    },
    // createdAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },
  },{
    timestamps: true, //Mongoose Auto-Created: createdAt, updateAt
    collection: "shops",
    toJSON: {virtuals: true},
});

shopSchema.virtual('menus', {
  ref: 'Menu',
  localField: '_id',
  foreignField: 'shop',
})

const shop = mongoose.model("Shop", shopSchema)

module.exports = shop
