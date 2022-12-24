const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name:  { type: String, required: true, trim: true },
    price: { type: Number },
    // shop: { type: Number }, //Mongoose Style
    shop: { type: Schema.Types.ObjectID, ref: 'Shop'}   //MongoDB Style
  },{
    timestamps: true,
    collection: "menus",
    toJSON: {virtuals: true},
});

schema.virtual('price_vat').get(function(){
    return(this.price*0.07) + this.price
})

const menu = mongoose.model("Menu", schema)

module.exports = menu
