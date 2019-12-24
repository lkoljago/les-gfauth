const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require('bcryptjs');

//create a schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next) {
  try {
    const salt = await Bcrypt.genSalt(10);
    const passwordHash = await Bcrypt.hash(this.password, salt);

    this.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
})

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await Bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
}
//create a model
const User = mongoose.model('user', userSchema);

//export the model
module.exports = User;