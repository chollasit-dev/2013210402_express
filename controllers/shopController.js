const fs = require('fs');   // Create File
const path = require('path');   // Random File Name
const uuidv4 = require('uuid');
// Insert File to Folder
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)


const Shop = require('../models/shop');
const menu = require('../models/menu');
const config = require('../config/index');

exports.index = async(req, res, next) => {

    const shops = await Shop.find().select('name photo location').sort({_id:-1})

    const showWithPhotoDomain = shops.map( (shop, index) => {
    return{
        id: shop._id,
        name: shop.name,
        photo: config.DOMAIN + shop.photo,
        location: shop.location,
    }
    } )

    res.status(200).json({
      data: showWithPhotoDomain
    })
}

exports.show = async(req, res, next) => {

    const { id } = req.params;
    // const shops = await Shop.findOne({_id: id}).populate('menus');
    const shops = await Shop.findById(id).populate('menus');

    res.status(200).json({
        data: shops
      })
}

exports.insert = async(req, res, next) => {

  const { name, location, photo } = req.body

  let shop = new Shop({
    name: name,
    location: location,
    photo: await saveImageToDisk(photo),
  });

    await shop.save();

  res.status(200).json({
    message: 'เพิ่มข้อมูลร้านอาหารเรียบร้อยแล้ว',
  })
}

async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve('./') ;
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4.v4()}.svg`;
  } else {
      filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath+filename, image.data, 'base64');
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}
