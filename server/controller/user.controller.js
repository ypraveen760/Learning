// const User = require("../model/user.model.js");

// module.exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().lean();
//     return res.status(200).json({
//       message: "all users",
//       users,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "error occured",
//     });
//   }
// };
