
import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Navbar, Nav, Row, Col } from 'rsuite';
import { Markdown } from 'markdownloader';
import Affix from 'rsuite-affix';

import './less/index.less';

import DefaultForm from './examples/DefaultForm';
import RSuiteForm from './examples/RSuiteForm';
import CustomFieldForm from './examples/CustomFieldForm';
import CustomCheckForm from './examples/CustomCheckForm';

const App = React.createClass({

  render() {

    return (
      <div className="doc-page">

        <Header inverse>
          <div className="container">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">form-lib </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>

              <Nav pullRight>
                <Nav.Item href="https://rsuitejs.com">RSuite</Nav.Item>
                <Nav.Item href="https://github.com/rsuite/form-lib">GitHub</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Header>

        <div className="container">

          <Row>
            <Col md={2}>
              <Affix offsetTop={70}>
                <Nav className="sidebar">
                  <Nav.Item href="#README">概述</Nav.Item>
                  <Nav.Item href="#DefaultForm">默认表单</Nav.Item>
                  <Nav.Item href="#RSuiteForm">RSuite 表单处理</Nav.Item>
                  <Nav.Item href="#CustomFieldForm">自定义 {'<Field>'} </Nav.Item>
                  <Nav.Item href="#CustomCheckForm">自定义触发校验 </Nav.Item>
                  <Nav.Item href="#API">API</Nav.Item>
                </Nav>
              </Affix>
            </Col>
            <Col md={10}>
              <a id="README" className="target-fix" ></a>
              <Markdown>
                {require('../README.md')}
              </Markdown>

              <a id="DefaultForm" className="target-fix" ></a>
              <h2># 默认表单</h2>
              <Row>
                <Col md={8}>
                  <Markdown>
                    {require('./md/DefaultForm.md')}
                  </Markdown>
                </Col>
                <Col md={4}>
                  <DefaultForm />
                </Col>
              </Row>

              <a id="RSuiteForm" className="target-fix" ></a>
              <h2># RSuite 表单处理</h2>
              <Row>
                <Col md={8}>
                  <Markdown>
                    {require('./md/RSuiteForm.md')}
                  </Markdown>
                </Col>
                <Col md={4}>
                  <RSuiteForm />
                </Col>
              </Row>

              <a id="CustomFieldForm" className="target-fix" ></a>
              <h2># 自定义 {'<Field>'}</h2>
              <Row>
                <Col md={8}>
                  <Markdown>
                    {require('./md/CustomFieldForm.md')}
                  </Markdown>
                </Col>
                <Col md={4}>
                  <CustomFieldForm />
                </Col>
              </Row>

              <a id="CustomCheckForm" className="target-fix" ></a>
              <h2># 自定义触发校验</h2>
              <Row>
                <Col md={8}>
                  <Markdown>
                    {require('./md/CustomCheckForm.md')}
                  </Markdown>
                </Col>
                <Col md={4}>
                  <CustomCheckForm />
                </Col>
              </Row>

              <a id="API" className="target-fix" ></a>
              <h2># API</h2>

              <Markdown>
                {require('./md/API.md')}
              </Markdown>

            </Col>
          </Row>
        </div>

      </div>

    );
  }
});

ReactDOM.render(<App />,
  document.getElementById('app')
);
