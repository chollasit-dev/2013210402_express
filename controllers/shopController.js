const Staff = require('../models/shop');

exports.index = async(req, res, next) => {

  const staff = await Staff.find().sort({_id: -1}) //1: Asc, -1: Desc

    res.status(200).json({
      data: staff
    })
}
