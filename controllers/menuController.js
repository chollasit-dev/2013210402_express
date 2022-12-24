const Menu = require('../models/menu');

exports.index = async(req, res, next) => {

  const menus = await Menu.find()

    res.status(200).json({
      data: menus
    })
}
