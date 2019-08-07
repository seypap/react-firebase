import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import News from '../../components/news';
import Chat from '../../components/chat';
import AttachedInfos from '../../components/attachedInfos';
import '../../styles/global.css';

import './index.css';

class MainPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <a href="/">
              <Image className="app-logo" src={require('./../../assets/logo.png')} fluid />
            </a>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <News />
              <Chat />
            </Col>
            <Col md={6} sm={12}>
              <AttachedInfos />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default MainPage;
