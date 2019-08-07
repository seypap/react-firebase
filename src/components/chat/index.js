import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { getCurrentDate } from '../../utils/date';
import CommentAPI from '../../firebase/firebase-apis/comment';
import { withRouter } from 'react-router-dom';
import './index.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserName: '',
      newComment: '',
      nameWarning: false,
      commentWarning: false,
      commentList: []
    };
  }

  componentDidMount() {
    const adminEmail = localStorage.getItem('email');
    const currentEmail = this.props.location.search.substring(1);

    CommentAPI.getComments(currentEmail, response => {
      this.setState({
        commentList: response
      });
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    if (name === 'newUserName' && value.length > 0) {
      this.setState({ nameWarning: false });
    }
    if (name === 'newComment' && value.length > 0) {
      this.setState({ commentWarning: false });
    }
    this.setState({ [name]: value });
  };

  onSaveComment = () => {
    const { newUserName, newComment } = this.state;
    const currentEmail = this.props.location.search.substring(1);

    if (newUserName.length < 1) {
      this.setState({ nameWarning: true });
    }
    if (newComment.length < 1) {
      this.setState({ commentWarning: true });
    }

    if (newUserName.length < 1 || newComment.length < 1) return;
    // add comment data
    const date = getCurrentDate();
    const name = newUserName;
    const comment = newComment;
    const projectId = currentEmail;

    CommentAPI.addComment({ date, name, comment, projectId });
    this.state = {
      newUserName: '',
      newComment: ''
    };
  };
  render() {
    const { nameWarning, commentWarning, commentList } = this.state;
    return (
      <div className="chat-container box-container">
        <div className="title">Chat</div>
        <div className="new-comment-container">
          <div className="name-input-group inline-group">
            <label className="form-label">Name : </label>
            <div className="input-infos">
              <input
                className="form-control"
                id="name-input"
                name="newUserName"
                onChange={this.onChange}
              />
              {nameWarning && <label className="warning-info">Name value can not be empty.</label>}
            </div>
          </div>
          <div className="comment-input-group inline-group">
            <label className="form-label">Comment : </label>
            <div className="input-infos">
              <textarea
                className="form-control"
                id="comment-input"
                name="newComment"
                rows="3"
                onChange={this.onChange}
              />
              {commentWarning && (
                <label className="warning-info">Comment value can not be empty.</label>
              )}
            </div>
          </div>
          <Button variant="primary" className="add-comment-btn" onClick={this.onSaveComment}>
            OK
          </Button>
        </div>
        <div className="comment-list-container">
          <Table bordered className="comment-list-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {commentList.map((subComment, index) => {
                return (
                  <tr key={index}>
                    <td>{subComment.date}</td>
                    <td>{subComment.name}</td>
                    <td>{subComment.comment}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
