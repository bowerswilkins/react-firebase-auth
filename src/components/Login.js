import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {Redirect} from 'react-router-dom';

import Link from './Link';
import Firebase from './Firebase';
import Button from './Button';
import Field from './Field';
import ErrorMsg from './ErrorMsg';
import Loader from './Loader';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "", 
      password: "",
      loader: true,
      error: null,
      user: null
    };

    this.controls = {
      button: injectSheet(this.props.classes)(Button),
      field: injectSheet(this.props.classes)(Field),
      loader: injectSheet(this.props.classes)(Loader),
      link: injectSheet(this.props.classes)(Link)
    };

    let savedUsername = sessionStorage.getItem("username");
    if (savedUsername && savedUsername !== "") this.state.username = savedUsername;

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInvalid = this.handleInvalid.bind(this);
    this.handleAuthStateChange = this.handleAuthStateChange.bind(this);

    Firebase.addListener(this.handleAuthStateChange);
  }

  componentDidMount() {
    let self = this;
    Firebase.auth.onAuthStateChanged(function(user) {
      self.setState({user: user, loader: false});
    });
  }

  componentWillUnmount() {
    Firebase.clearListener();
  }

  handleFieldChange(event) {
    event.target.setCustomValidity('');

    let newState = {};
    newState[event.target.id] = event.target.value
    this.setState(newState);

    if (event.target.id === "username") {
      sessionStorage.setItem("username", event.target.value);
    }
  };

  handleInvalid(event) {

    if (event.target.id === "password") {
      event.target.setCustomValidity("Please enter your password.");
    }

    if (event.target.id === "username") {
      event.target.setCustomValidity("Please enter your email address.")
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loader: true});

    let self = this;
    Firebase.emailAndPassword(this.state.username, this.state.password)
      .then(function(result) {
        return self.setState({user: result, error: null, loader: false});
      })
      .catch(function(error) {
        return self.setState({error: error, loader: false});
      });
  }

  handleAuthStateChange(event) {
    let self = this;
    
    if (event) {

      let Token;

      event.getIdToken(true).then(function(token) {

        Token = token;
        return Firebase.getUserMetadata(event.uid);

      }).then(function(metadata) {
        
        self.setState({user: event, error: null, password: ""});

        let url = `${window.location.origin}/bowers/auth?token=${Token}&first=${metadata.name.first}&last=${metadata.name.last}`;

        return window.location.replace(url);
      });

    } else {
      this.setState({user: event, loader: false, error: null, password: ""});
    }
  }

  loader() {
    const Loader = this.controls.loader;
    return (
      <div className={this.props.className}>
        <Loader classes={[this.props.classes.loader]}/>
      </div>
    );
  }

  login() {
    let errMsg = null;
    const LoginField = this.controls.field;
    const LoginButton = this.controls.button;
    const LoginLink = this.controls.link;

    if (this.state.loader) {
      return this.loader();
    }

    if (this.state.error) {
      errMsg = (
        <ErrorMsg>{this.state.error.message}</ErrorMsg>
      );
    }

    return(
      <div className={this.props.className}>
        <section id="error">{errMsg}</section>
        <section id="form">
          <form onSubmit={this.handleSubmit} onInvalid={this.handleInvalid}>
            <div>
              <LoginField
                required={true}
                id="username" 
                label="Email" 
                type="email" 
                onChange={this.handleFieldChange} 
                value={this.state.username} />
            </div>
            <div>
              <LoginField
                required={true}
                id="password"
                label="Password"
                type="password"
                onChange={this.handleFieldChange}
                value={this.state.password} />
            </div>
            <LoginButton type="submit">Log in</LoginButton>
          </form>
        </section>
        <section id="links">
          <div>
            <LoginLink href="/reset" style={{float:'left'}}>Forgot your password?</LoginLink>
            <LoginLink href="/create" style={{float:'right'}}>Don't have an account?</LoginLink>
          </div>
        </section>
      </div>
    );
  }

  success(url) {
    return (
      <Redirect to={url} />
    )
  }

  render() {

    if (!this.state.user) {
      return this.login();
    }
    
    return this.loader();
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Login;