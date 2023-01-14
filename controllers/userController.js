const { findOne } = require("../models/user")
const User = require("../models/user")

exports.index = (req, res, next) =>  {
    res.status(200).json({
        fullname: "Chollasit Vibulsirikul"
    })
}

exports.bio = (req, res, next) => {
    res.status(200).json({
      fullname: "Chollasit Vibulsirikul",
      nickname: "Chin",
      hobby: "Play Games",
      gitusername: "chollasit-dev"
    })
}

exports.register = async(req, res, next) => {
    try {
        const { name, email, password } = req.body  // Destructuring

        const existEmail = await User.findOne({ email:email })
        if (existEmail){
            const error = new Error("This email is already used!")
            error.statusCode = 400
            throw error;
        }
    
        let user = new User();
        user.name = name
        user.email = email
        user.password = await user.encryptPassword(password)
        // "user.password = hashPassword.password": No Await (for 1st Async to be done), Not Safe
    
        await user.save()
    
        res.status(201).json({
            message: "Hello, registered!"
        })
    } catch (error) {
        next(error);
    }
}
