const menu = require('../models/menu');

exports.index = async(req, res, next) => {

    // const menus = await Menu.find().select('+name -price')
    // const menus = await Menu.find().where('price').gt(200)
    const menus = await menu.find().populate('shop')
    res.status(200).json({
      data: menus
    })
}
