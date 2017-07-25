import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { SchemaModel, StringType } from 'rsuite-schema';
import Form from '../src/Form';
import Field from '../src/Field';
import createFormControl from '../src/createFormControl';

const checkEmail = '请输入正确的邮箱';
const model = SchemaModel({
  name: StringType().addRule((value) => {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
  }, checkEmail)
});


describe('Form', () => {

  it('Should output a form', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form />
    );
    const element = findDOMNode(instance);
    assert.equal(element.tagName, 'FORM');
  });

  it('Should be horizontal', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form horizontal />
    );
    const element = findDOMNode(instance);
    assert.ok(element.className.match(/\bform-horizontal\b/));
  });

  it('Should be inline', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form inline />
    );
    const element = findDOMNode(instance);
    assert.ok(element.className.match(/\bform-inline\b/));
  });

  it('Should have a value', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        values={values}
      >
        <Field name="name" />
        <Field name="email" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.equal(element.querySelector('input[name="name"]').value, values.name);
    assert.equal(element.querySelector('input[name="email"]').value, values.email);
  });


  it('Should have a default values', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
      >
        <Field name="name" />
        <Field name="email" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.equal(element.querySelector('input[name="name"]').value, values.name);
    assert.equal(element.querySelector('input[name="email"]').value, values.email);
  });

  it('Should call onChange callback', (done) => {

    const values = {
      name: 'abc'
    };

    const doneOp = (v) => {
      if (v.name === values.name) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
        onChange={doneOp}
      >
        <Field name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });


  it('Should call onError callback', (done) => {

    const values = {
      name: 'abc'
    };

    const doneOp = (v) => {
      if (v.name === checkEmail) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
        onError={doneOp}
        model={model}
      >
        <Field name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should not call onError callback', (done) => {
    let isValid = true;
    const values = {
      name: 'abc@ddd.com'
    };

    const doneOp = () => {
      isValid = false;
    };

    setTimeout(() => {
      if (isValid) {
        done();
      }
    }, 10);

    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
        onError={doneOp}
        model={model}
      >
        <Field name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should call onCheck callback', (done) => {

    const values = {
      name: 'abc'
    };

    const doneOp = (v) => {
      if (v.name === null) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
        onCheck={doneOp}
      >
        <Field name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });


  it('Should call onCheck callback when blur', (done) => {
    const values = {
      name: 'abc'
    };

    const doneOp = (v) => {
      if (v.name === null) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
        onCheck={doneOp}
        checkTrigger="blur"
      >
        <Field name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.blur(element.querySelector('input[name="name"]'));
  });

  it('Should not call onCheck callback when checkTrigger is null', (done) => {
    let isValid = true;
    const values = {
      name: 'abc'
    };

    const doneOp = () => {
      isValid = false;
    };

    setTimeout(() => {
      if (isValid) {
        done();
      }
    }, 10);

    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
        onCheck={doneOp}
        checkTrigger={null}
      >
        <Field name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.blur(element.querySelector('input[name="name"]'));
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });


  it('Should call onCheck callback', (done) => {

    const values = {
      name: 'abc'
    };

    const doneOp = (v) => {
      if (v.email === 'email is null') {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        defaultValues={values}
        onCheck={doneOp}
        errors={{
          email: 'email is null'
        }}
      >
        <Field name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });


  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form className="custom" />
    );
    const element = findDOMNode(instance);
    assert.ok(element.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Form style={{ fontSize }} />
    );
    const element = findDOMNode(instance);
    assert.equal(element.style.fontSize, fontSize);
  });

});
