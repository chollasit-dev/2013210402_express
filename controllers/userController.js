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
