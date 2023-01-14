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
    const { name, email, password } = req.body  // Destructuring

    let user = new User();
    user.name = name
    user.email = email
    user.password = await user.encryptPassword(password)
    // "user.password = hashPassword.password": No Await (for 1st Async to be done), Not Safe

    await user.save()

    res.status(201).json({
        message: "Hello, registered!"
    })
}
