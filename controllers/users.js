const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_secret } = require('../configuration');

signToken = user => {
  console.log(user);
  
  return JWT.sign({
    iss: 'gauth',
    sub: user,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 60) //current time + 1 day ahead
    
  }, JWT_secret);

}
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    
    const foundUser = await User.findOne({ email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use!'})
    };
    
    //create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    //generate new token of user
    const token = signToken(newUser.id);
    var decoded = JWT.decode(token);
    console.log(decoded);
    
    //respond with token
    res.status(200).json({ token });
   


  },

  signIn: async (req, res, next) => {
    console.log('req.user ', req.user);
    
    const token = signToken(req.user.id);
    res.status(200).json({ token });
    
    console.log('Succesfull login!');
  },

  secret: async (req, res, next) => {
    console.log('i managed to SECRET');
    res.json({ secret: "succesfull"});
  }
}