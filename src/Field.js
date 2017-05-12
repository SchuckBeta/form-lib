import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import elementType from './utils/elementType';
import createFormControl from './createFormControl';

const propTypes = {
  name: PropTypes.string.isRequired,
  accepter: elementType
};

const defaultProps = {
  accepter: createFormControl('input')
};

class Field extends React.Component {

  constructor(props, context) {
    super(props, context);
    if (!context._form) {
      throw new Error('Field must be inside a component decorated with <Form>');
    }

    if (!props.name) {
      throw new Error(' `name` is undefined on <Field>');
    }

    const { values = {}, defaultValues = {} } = context._form;
    const name = props.name;

    this.state = {
      checkResult: {},
      value: values[name] || defaultValues[name]
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleFieldCheck = this.handleFieldCheck.bind(this);
  }


  handleFieldChange(value) {

    const { name } = this.props;
    const { onFieldChange, checkTrigger } = this.context._form;
    const checkResult = this.handleFieldCheck(value, checkTrigger === 'change');

    this.setState({ checkResult, value });
    onFieldChange(name, value, checkResult);

  }

  handleFieldBlur() {
    const { name } = this.props;
    const { checkTrigger } = this.context._form;
    this.handleFieldCheck(this.state.value, checkTrigger === 'blur');
  }

  handleFieldCheck(value, isCheckTrigger) {
    const { name } = this.props;
    const {
      onFieldError,
      onFieldSuccess,
      model
    } = this.context._form;


    const checkResult = model.checkForField(name, value);

    if (isCheckTrigger) {
      if (checkResult.hasError) {
        onFieldError(name, checkResult.errorMessage);
      } else {
        onFieldSuccess(name);
      }
    }

    return checkResult;
  }

  render() {
    const { name, accepter: Component, ...props } = this.props;
    const { values = {}, defaultValues = {} } = this.context._form;
    const { checkResult } = this.state;

    return (
      <Component
        onChange={this.handleFieldChange}
        onBlur={this.handleFieldBlur}
        errorMessage={checkResult.errorMessage}
        isValid={checkResult.hasError === undefined ? undefined : !checkResult.hasError}
        defaultValue={defaultValues[name]}
        value={values[name]}
        { ...props }
      />
    );
  }
}

Field.defaultProps = defaultProps;
Field.propTypes = propTypes;
Field.contextTypes = {
  _form: PropTypes.object
};

export default Field;
