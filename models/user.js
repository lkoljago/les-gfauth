const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require('bcryptjs');

//create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String,
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }

  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }

  }
  
});

userSchema.pre('save', async function(next) {
  try {
    if (this.method !== 'local') {
      next();
    }
    const salt = await Bcrypt.genSalt(10);
    const passwordHash = await Bcrypt.hash(this.local.password, salt);

    this.local.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
})

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await Bcrypt.compare(newPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
}
//create a model
const User = mongoose.model('user', userSchema);

//export the model
module.exports = User;