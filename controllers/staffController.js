const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const Staff = require('../models/staff');
const config = require('../config/index');

exports.index = async(req, res, next) => {

  const staff = await Staff.find().sort({_id: -1}) //1: Asc, -1: Desc

    res.status(200).json({
      data: staff
    })
}

exports.show = async(req, res, next) => {

  try {
    const { id } = req.params
    const staff = await Staff.findOne({
      _id: id
    })

    if (!staff) {
      const error = new Error("User not found!")
      error.statusCode = 400
      throw error
    }

      res.status(200).json({
        data: staff
      })
  } catch (error) {
      next(error);
  }
}

exports.destroy = async(req, res, next) => {

  try {
    const { id } = req.params
    const staff = await Staff.deleteOne({
      _id: id
    })

    if (staff.deletedCount === 0) {
      const error = new Error("Cannot delete, no user found!")
      error.statusCode = 400
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

exports.insert = async(req, res, next) => {

  const { name, salary, photo } = req.body

  let staff = new Staff({
    name: name,
    salary: salary,
    photo: config.DOMAIN + await saveImageToDisk(photo)
  });   //Define Staff's
  // let staff = new Staff(req.body); //All Fields
  await staff.save();

  res.status(200).json({
    message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
  })
}

exports.update = async (req, res, next) => {

    try {

      const { id } = req.params
      const { name, salary } = req.body

      // Method 1:
      // const staff = await Staff.findById(id)
      // staff.name = name
      // staff.salary = salary
      // await staff.save()

      //Method 2:
      // const staff = await Staff.findByIdAndUpdate(id,{
      //   name: name,
      //   salary: salary
      // })

      const staff = await Staff.updateOne({ _id : id },{
        name: name,
        salary: salary
      })

      console.log(staff)

      res.status(200).json({
        message: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
      })

    } catch (error) {
      const e = new Error(error.message)
      e.statusCode = 400
      next(error);
    }
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
