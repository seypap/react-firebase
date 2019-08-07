import React from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import NewsAPI from '../../firebase/firebase-apis/news';

import './index.css';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcement: '',
      role: ''
    };
  }

  componentDidMount() {
    const adminEmail = localStorage.getItem('email');
    const currentEmail = this.props.location.search.substring(1);
    const role = adminEmail === currentEmail ? 'admin' : 'user';
    this.setState({ role });

    NewsAPI.getNews(currentEmail, response => {
      this.setState({
        announcement: response
      });
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onUpdateNews = () => {
    const { announcement } = this.state;
    NewsAPI.updateNews(announcement, response => {});
  };

  render() {
    const { role, announcement } = this.state;
    return (
      <div className="news-container box-container">
        <div className="title">Announcements/News</div>
        <div className="announce-wrapper">
          <textarea
            disabled={role !== 'admin'}
            className="form-control"
            id="comment-input"
            name="announcement"
            rows="7"
            value={announcement}
            onChange={this.onChange}
          />
          <Button
            id={role === 'admin' ? 'show' : 'hidden'}
            variant="primary"
            className="update-announcement-btn"
            onClick={this.onUpdateNews}
          >
            UPDATE
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(News);
