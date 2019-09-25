import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Firebase from './Firebase';

import Field from './Field';
import Button from './Button';
import ErrorMsg from './ErrorMsg';
import Loader from './Loader';

class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      loader: false,
      error: null,
      success: false
    }

    this.controls = {
      email: injectSheet(this.props.classes)(Field),
      submit: injectSheet(this.props.classes)(Button),
      loader: injectSheet(this.props.classes)(Loader)
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({value: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let self = this;

    this.setState({loader: true});

    Firebase.sendPasswordResetEmail(this.state.value)
    .then(function() {
      self.setState({success: true, loader: false});
    })
    .catch(function(error) {
      self.setState({error: error, loader: false});
    })
  }

  loader() {
    const Loader = this.controls.loader;
    return (
      <div className={this.props.className}>
        <Loader classes={[this.props.classes.loader]}/>
      </div>
    );
  }

  render() {
    let errMsg = null;
    const Submit = this.controls.submit;
    const Email = this.controls.email;

    if (this.state.loader) {
      return this.loader();
    }

    if (this.state.success === true) {
      return (
        <div className={this.props.className}>
          <span>Check your email.</span>
        </div>
      );
    }

    if (this.state.error) {
      errMsg = (
        <ErrorMsg>{this.state.error.message}</ErrorMsg>
      );
    }

    return (
      <div className={this.props.className}>
        <span>Enter your email address and we'll send you an email to reset your password.</span>
        <section id="error">{errMsg}</section>
        <section id="passwordReset">
          <form onSubmit={this.handleSubmit}>
            <div>
              <Email type="email" id="email" label="Email" variant="outlined" required={true} onChange={this.handleChange}/>
            </div>
            <Submit type="submit">Send</Submit>
          </form>
        </section>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default ResetPassword;