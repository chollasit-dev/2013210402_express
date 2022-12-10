const data = [
  {
    id: "1",
    name: "C.S.I Group",
    address: {
      province: "Bangkok",
      postcode: "10500",
    }
  },
  {
    id: "2",
    name: "M. Soft",
    address: {
      province: "Bangkok",
      postcode: "10120",
    }
  },
  {
    id: "3",
    name: "Techno Brave Asia",
    address: {
      province: "Bangkok",
      postcode: "10400",
    }
  },
];



const Company = require('../models/company');

// exports.company = async (req, res, next) => {

//   const company = await Company.findOne()

//     res.status(200).json({
//       data: company
//     })

// }


//
exports.company = async(req, res, next) => {

  try {

    const company = await Company.find().sort({ _id: 1 });

    if (!company) {

      throw new Error('Company not found')

    } else {

      res.status(200).json({
        data: company
      })

    }
  } catch (error) {

    res.status(400).json({
      error:{ message: 'Error: ' + error.message }
    })

  }
}

exports.insert = async(req, res, next) => {

  try {
    const { name, address: {province} } = req.body

    let company = new Company({
      name: name,
      address: {
        province: province
      }
    });
    // let staff = new Staff(req.body);
    await company.save();
  
    res.status(200).json({
      message: 'Insert Completed',
    })
  } catch (error) {
    res.status(400).json({
      error:{ message: 'Error: ' + error.message }
    })
  }
}

exports.destroy = async(req, res, next) => {

  try {

    const { id } = req.params
    const company = await Company.deleteOne({
      _id: id
    })

    res.status(200).json({
      message: "Delete Completed"
    })
    // if (company.deletedCount === 0) {

    //   throw new Error('Cannot perform an action, no user found.')

    // } else {

    //   res.status(200).json({
    //     message: "Delete Completed"
    //   })
      
    // }
  } catch (error) {

    res.status(400).json({
      error:{
        message: 'Error: ' + error.message
      }
    })

  }
}

exports.update = async (req, res, next) => {

  try {

    const { id } = req.params
    const { name, address: {province} } = req.body

    const company = await Company.updateOne({ _id : id },{
      name: name,
      address: {
        province: province
      }
    })

    res.status(200).json({
      message: 'Edited',
    })

  } catch (error) {

    res.status(400).json({
      error:{
        message: 'Error: ' + error.message
      }
    })

  }
}



// exports.company = (req, res, next) => {
//     res.status(200).json({
//       data: data 
//     })
// }