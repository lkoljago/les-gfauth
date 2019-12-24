const express = require('express');

const r = require('express').Router();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false })

r.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

r.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

r.route('/secret')
  .get(passportJWT, UsersController.secret);

module.exports = r; 