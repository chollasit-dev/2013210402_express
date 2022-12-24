const Staff = require('../models/shop');

exports.index = async(req, res, next) => {

  const shop = await Staff.find().select('name photo location').sort({_id:-1})

    res.status(200).json({
      data: shop
    })
}
