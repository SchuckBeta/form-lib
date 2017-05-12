import React from 'react';
import createChainableTypeChecker from './createChainableTypeChecker';

/**
 * Checks whether a prop provides a type of element.
 *
 * The type of element can be provided in two forms:
 * - tag name (string)
 * - a return value of React.createClass(...)
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */

function validate(props, propName, componentName) {

  if (typeof props[propName] !== 'function') {

    let errMsg;

    if (React.isValidElement(props[propName])) {
      errMsg = `Invalid prop ${propName} of value ${props[propName]} supplied to ${componentName}. Expected an Element "type" , not an actual Element`;
    }

    if (typeof props[propName] !== 'string') {
      errMsg = `Invalid prop ${propName} of value ${props[propName]} supplied to ${componentName}. Expected an Element "type" , such as a tag name or return value of React.createClass(...)`;
    }

    if (errMsg) {
      return new Error(errMsg);
    }
  }
}

export default createChainableTypeChecker(validate);
