import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import UploadsAPI from '../../firebase/firebase-apis/uploads';
import { withRouter } from 'react-router-dom';

import './index.css';

class AttachedInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFileDescription: '',
      newFileName: '',
      newFileGroup: 'PLANS',
      newFileUrl: '',
      newFile: '',
      files: [],
      role: ''
    };
  }

  componentDidMount() {
    const adminEmail = localStorage.getItem('email');
    const currentEmail = this.props.location.search.substring(1);
    const role = adminEmail === currentEmail ? 'admin' : 'user';
    this.setState({ role });

    UploadsAPI.getUploads(currentEmail, response => {
      this.setState({
        files: response
      });
    });
  }

  onChangeDescription = e => {
    const { value } = e.target;
    this.setState({
      newFileDescription: value
    });
  };

  onSetNewFileGroup = e => {
    this.setState({
      newFileGroup: e.target.value
    });
  };

  onSelectFile = event => {
    const file = event.target.files[0];
    this.setState({
      newFile: file,
      newFileName: file.name
    });
  };

  onUploadFile = () => {
    const { newFileDescription, newFileName, newFileGroup, newFile } = this.state;
    const currentEmail = this.props.location.search.substring(1);

    // add upload data
    const name = newFileName;
    const description = newFileDescription;
    const group = newFileGroup;
    const projectId = currentEmail;
    const file = newFile;

    UploadsAPI.addUploads(
      {
        name,
        description,
        group,
        projectId,
        file
      },
      response => {
        this.setState({
          newFileUrl: response
        });
      }
    );

    this.setState({ newFileDescription: '', newFileName: '' });
  };
  render() {
    console.log('file--->', this.state);
    const { newFileGroup, files, newFileName, newFileDescription, role } = this.state;
    const planFiles = files.filter(file => {
      return file.group === 'PLANS';
    });
    const ideaFiles = files.filter(file => {
      return file.group === 'GARDEN IDEAS';
    });

    return (
      <div className="upload-files-container box-container">
        <div className="title">Documents/News</div>
        <div className="new-file-container" id={role === 'admin' ? 'show' : 'hidden'}>
          <div className="new-file-group">
            <div className="file-group" onChange={this.onSetNewFileGroup}>
              <input
                disabled={role !== 'admin'}
                type="radio"
                value="PLANS"
                name="gender"
                checked={newFileGroup === 'PLANS'}
                onChange={this.onSetNewFileGroup}
              />
              PLANS
            </div>
            <div className="file-group">
              <input
                disabled={role !== 'admin'}
                type="radio"
                value="GARDEN IDEAS"
                name="gender"
                checked={newFileGroup !== 'PLANS'}
                onChange={this.onSetNewFileGroup}
              />
              GARDEN IDEAS
            </div>
          </div>
          <div className="new-file-description inline-group">
            <label className="form-label">Description : </label>
            <div className="input-infos">
              <input
                className="form-control"
                id="name-input"
                name="newUserName"
                value={newFileDescription}
                placeholder="File description"
                onChange={this.onChangeDescription}
              />
            </div>
          </div>
          <div className="upload-file-select">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
              onChange={this.onSelectFile}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              {newFileName.length < 1 ? 'Choose File' : newFileName}
            </label>
          </div>
          <Button
            disabled={role !== 'admin'}
            variant="primary"
            className="upload-button"
            disabled={newFileDescription.length < 1 || newFileName.length < 1}
            onClick={this.onUploadFile}
          >
            UPLOAD
          </Button>
        </div>

        <div className="input-group uploaded-file-list">
          <Container>
            {planFiles.length > 0 && (
              <Row>
                <Col md={4} sm={12}>
                  <div className="group-title">PLANS:</div>
                </Col>
                <Col md={8} sm={12}>
                  {planFiles.map((file, index) => {
                    return (
                      <div key={index}>
                        <p className="file-description">-{file.description}</p>
                        <a className="file-name" href={file.uploadUrl}>
                          {file.name}
                        </a>
                      </div>
                    );
                  })}
                </Col>
              </Row>
            )}
            {ideaFiles.length > 0 && (
              <Row>
                <Col md={4} sm={12}>
                  <div className="group-title">GARDEN IDEAS:</div>
                </Col>
                <Col md={8} sm={12}>
                  {ideaFiles.map((file, index) => {
                    return (
                      <div key={index}>
                        <p className="file-description">-{file.description}</p>
                        <a className="file-name" href={file.uploadUrl}>
                          {file.name}
                        </a>
                      </div>
                    );
                  })}
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

export default withRouter(AttachedInfos);
