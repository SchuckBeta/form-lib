import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { isChrome, isFirefox, isSafari, isIE, isEdge, isOpera } from './utils/BrowserDetection';

function isTextField(target) {
  return (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement);
}


function createFormControl(Component) {

  // if now is in composition session
  let isOnComposition = false;

  // for safari use only, innervalue can't setState when compositionend occurred
  let isInnerChangeFromOnChange = false;

  const propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func
  };

  class FormControl extends React.Component {

    constructor(props, context) {
      super(props, context);
      const value = props.value || props.defaultValue || '';
      this.state = {
        inputValue: value,
        innerValue: value,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleComposition = this.handleComposition.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (!_.isEqual(nextProps.value, this.props.value)) {
        this.state = {
          inputValue: nextProps.value,
          innerValue: nextProps.value,
        };
      }
    }

    handleChange(e) {

      const { onChange = () => { } } = this.props;
      const value = e.target.value;
      // Flow check
      if (!isTextField(e.target)) {
        onChange(value, e);
        return;
      }


      if (isInnerChangeFromOnChange) {
        this.setState({
          inputValue: value,
          innerValue: value
        });
        onChange(value, e);
        isInnerChangeFromOnChange = false;
        return;
      }

      // when is on composition, change inputValue only
      // when not in composition change inputValue and innerValue both
      if (!isOnComposition) {
        this.setState({
          inputValue: value,
          innerValue: value,
        });
        onChange(value, e);
      } else {
        this.setState({ inputValue: value });
      }
    }

    /* istanbul ignore next */
    handleComposition(e) {

      const { onChange = () => { } } = this.props;

      // Flow check
      if (!isTextField(e.target)) {
        return;
      }

      if (e.type === 'compositionend') {

        const value = e.target.value;
        // Chrome is ok for only setState innerValue
        // Opera, IE and Edge is like Chrome
        if (isChrome || isIE || isEdge || isOpera) {
          this.setState({ innerValue: value });
          onChange(value, e);
        }

        // Firefox need to setState inputValue again...
        if (isFirefox) {
          this.setState({
            innerValue: value,
            inputValue: value
          });
          onChange(value, e);
        }

        // Safari think e.target.value in composition event is keyboard char,
        //  but it will fired another change after compositionend
        if (isSafari) {
          // do change in the next change event
          isInnerChangeFromOnChange = true;
        }

        isOnComposition = false;
      } else {
        isOnComposition = true;
      }
    }

    render() {
      const { className, value, ...props } = this.props;

      if (!_.isUndefined(value)) {
        props.value = this.state.inputValue;
      }


      return (
        <Component
          {...props}
          className={`form-control ${className || ''}`}
          onCompositionStart={this.handleComposition}
          onCompositionUpdate={this.handleComposition}
          onCompositionEnd={this.handleComposition}
          onChange={this.handleChange}
        />
      );
    }
  }

  FormControl.propTypes = propTypes;
  FormControl.displayName = 'FormControlField';

  return FormControl;
}

export default createFormControl;
