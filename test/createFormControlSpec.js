import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import createFormControl from '../src/createFormControl';


describe('createFormControl', () => {

  it('Should output a input', () => {

    const TextField = createFormControl('input');
    const instance = ReactTestUtils.renderIntoDocument(
      <TextField />
    );

    const element = findDOMNode(instance);
    assert.equal(element.tagName, 'INPUT');
  });


  it('Should call `onChange` callback', (done) => {

    const TextField = createFormControl('input');
    const instance = ReactTestUtils.renderIntoDocument(
      <TextField
        onChange={() => {
          done();
        }}
      />
    );
    ReactTestUtils.Simulate.change(findDOMNode(instance));
  });

});
