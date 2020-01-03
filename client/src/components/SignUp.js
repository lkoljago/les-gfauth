import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import CustomInput from './CustomInput';

class SignUp extends Component {
  onSubmit(formData) {
    console.log('onSubmit() turn on');
    console.log('formData ', formData);
    
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

export default reduxForm({ form: 'singup' })(SignUp);