import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions/index';
import CustomInput from './CustomInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
      this.onSubmit = this.onSubmit.bind(this);
    
  }
  async onSubmit(formData) {
    console.log('onSubmit() turn on');
    console.log('formData ', formData);
    // actions creator
    await this.props.signUp(formData);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter Your email"
                placeholder="exampl@example.com"
                component={ CustomInput } />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="text"
                id="password"
                label="Enter Your password"
                placeholder="yourpassword"
                component={ CustomInput } />
            </fieldset>
            <button type="submit" className="btn btn-primary">SIGN UP</button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">Social autentification</div>
            <button className="btn btn-default">Google</button>
            <button className="btn btn-default">Facebook</button>
          </div>
        </div>
      </div>
    )
  }
};

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signup' })
) (SignUp);