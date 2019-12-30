const passport        = require('passport');
const JwtStrategy     = require('passport-jwt').Strategy;
const { ExtractJwt }  = require('passport-jwt');
const LocalStrategy   = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy   = require('passport-facebook-token');
const { JWT_secret }  = require('./configuration');
const User            = require('./models/user');
const colors          = require('colors');

//JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  secretOrKey: JWT_secret
}, async (payload, done) => {
  try {
    
    //find user specifide by token
    console.log('payload '.yellow, payload);
    
    const user = await User.findById(payload.sub);
    console.log('user '.yellow, user);
    
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch(error) {
    done(error, false);
  }

}));

// GOOGLE STRATEGY
passport.use(new GooglePlusTokenStrategy({
  clientID: '752035339031-0lh7pctsth758g7ecr428nejvf0rpu62.apps.googleusercontent.com',
  clientSecret: '3D5KI0oeDX3izqabpc5cHDEx'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken '.yellow, accessToken);
    console.log('refreshToken '.yellow, refreshToken);
    console.log('profile '.yellow, profile);
    
    const existingUser = await User.findOne({ 'google.id': profile.id });
    if (existingUser) {
      console.log('============= User already exists in DB ============'.red);
      
      return done(null, existingUser);
    }
    console.log(`=============== create new user ${profile.displayName} =================`.blue);
    
    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    })
    // if new account
    await newUser.save();
    done(null, newUser);
    
  } catch(error) {
    done(error, false, error.message);
    
  }
  
}));

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: '761487861038364',
  clientSecret: '624f9fdd4cf4dc59a2b4645d7ad41c12'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken facebook '.yellow, accessToken);
    console.log('refreshToken facebook '.yellow, refreshToken);
    console.log('profile facebook '.yellow, profile);
    const existingUser = await User.findOne({ 'facebook.id': profile.id });
    if (existingUser) {
      console.log('============= User already exists in DB ============'.red);
      return done(null, existingUser);
    }
    console.log(`=============== create new user ${profile} =================`.blue);
    
    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    })
    // if new account
    await newUser.save();
    done(null, newUser);
    
  } catch(error) {
    done(error, false, error.message);
  }
}))

//LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    //find the user given email
    const user = await User.findOne({ "local.email": email });
    // console.log({user});
    
    //if not handle it
    if (!user) {
      return done(null, false);
    }
    //check if the pasword is correct
    const isMatch = await user.isValidPassword(password);

    //if not handle it
    if (!isMatch) {
      return done(null, false);
    }
    //otherwise, return the user
    done(null, user);

  } catch(error) {
    done(error, false);
  }
  
}))