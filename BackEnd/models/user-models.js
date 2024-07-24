const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
});

// userSchema.pre("save", async  function(next){
// const user=this;
// if(!user.isModified("password")){
//     next();
// }
// try {
//     const salt = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(user.password, salt);
//     user.password=hash_password;
//     console.log(user)
// } catch (error) {
//     next(error);
// }
// })

const User = new mongoose.model("User", userSchema);

module.exports = User;
