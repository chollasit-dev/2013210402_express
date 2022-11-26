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

exports.company = (req, res, next) => {
    res.status(200).json({
      data: data 
    })
}