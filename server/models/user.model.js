const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "atlest 3 character required"],
      maxLength: [20, "max character limit exceed"],
      require: [true, "Name Id Required"],
    },
    email: {
      type: String,
      require: [true, "Email Id Required"],
    },
    password: {
      type: String,
      minLength: [3, "atlest 3 character required"],
      maxLength: [200, "max character limit exceed"],
      require: [true, "Password Required"],
    },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });

// userSchema.pre("save",async function (params) {

// })create later
module.exports = mongoose.model("User", userSchema);
