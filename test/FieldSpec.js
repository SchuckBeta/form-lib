import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Form from '../src/Form';
import Field from '../src/Field';
import createFormControl from '../src/createFormControl';


describe('Field', () => {

  it('Should output a input', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <Field name="username" />
      </Form>
    );

    const element = findDOMNode(instance);
    assert.ok(element.querySelector('input'));
  });

  it('Should output a textarea', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <Field name="username" accepter={createFormControl('textarea')} />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.ok(element.querySelector('textarea'));
  });

  it('Should call onChange callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <Field name="username" onChange={doneOp} />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input'));
  });

  it('Should call onBlur callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <Field name="username" onBlur={doneOp} />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.blur(element.querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <Field className="custom" name="username" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.ok(element.querySelector('input').className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <Field style={{ fontSize }} name="username" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.equal(element.querySelector('input').style.fontSize, fontSize);
  });

});
