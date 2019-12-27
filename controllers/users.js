const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_secret } = require('../configuration');
const colors = require('colors');

signToken = user => {
  console.log('user from signToken'.yellow, user);
  
  return JWT.sign({
    iss: 'gauth',
    sub: user,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 60) //current time + 60 day ahead
    
  }, JWT_secret);

}
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use!'})
    };
    
    //create a new user
    const newUser = new User({ 
      method: 'local',
      local: {
        email: email, 
        password: password 
      }
      
    });
    await newUser.save();

    //generate new token of user
    const token = signToken(newUser);
    var decoded = JWT.decode(token);
    console.log('newUser.id '.yellow, newUser.id);
    console.log('newUser._id '.yellow, newUser._id);
    
    console.log('decoded '.yellow, decoded);
    console.log('token new user '.yellow, token);
    
    //respond with token
    res.status(200).json({ token });
   


  },

  signIn: async (req, res, next) => {
    console.log('req.user from singIn'.yellow, req.user);
    
    const token = signToken(req.user);
    res.status(200).json({ token });
    
    console.log('Succesfull login!'.blue);
  },

  googleOAuth: async (req, res, next) => {
    console.log('req.user from googleOAuth'.yellow, req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('i managed to SECRET'.blue);
    res.json({ secret: "succesfull"});
  }
}