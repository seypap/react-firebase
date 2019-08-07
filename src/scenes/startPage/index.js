import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import '../../styles/global.css';

import './index.css';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  onStart = () => {
    const { email } = this.state;
    if (email.length < 1) return;

    localStorage.setItem('email', email);
    this.props.history.push({
      pathname: '/main',
      search: email
    });
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="start-page-container">
        <a href="/">
          <Image className="app-start-logo" src={require('./../../assets/logo.png')} fluid />
        </a>
        <div className="email-input-group inline-group">
          <label className="form-label email-label">Email : </label>
          <div className="input-infos">
            <input
              className="form-control"
              id="email-input"
              name="email"
              onChange={this.onChange}
            />
          </div>
        </div>
        <Button variant="primary" className="start-btn" onClick={this.onStart}>
          Start
        </Button>
      </div>
    );
  }
}

export default StartPage;
