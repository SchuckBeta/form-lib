import React from 'react';

function createFormControl(Component) {

  const isChrome = !!window.chrome && !!window.chrome.webstore;
  let isOnComposition = false;


  return class extends React.Component {


    constructor(props, context) {
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.handleComposition = this.handleComposition.bind(this);
    }

    handleComposition(e) {
      const { onChange } = this.props;
      if (e.type === 'compositionend') {
        // composition is end
        isOnComposition = false;
        /**
         * fixed for Chrome v53+ and detect all Chrome
         * https://chromium.googlesource.com/chromium/src/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
         */

        if (e.target instanceof HTMLInputElement && !isOnComposition && isChrome) {
          // fire onChange
          onChange && onChange(e.target.value);
        }
      } else {
        // in composition
        isOnComposition = true;
      }
    }

    handleChange(e) {
      const { onChange = () => { } } = this.props;
      const isInput = (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement);
      const value = e.target.value;

      if (isInput && !isOnComposition) {
        onChange(value);
      } else if (!isInput) {
        onChange(value);
      }

      isOnComposition = false;

    }

    render() {
      const { className, ...props } = this.props;
      return (
        <Component
          {...props}
          className={`form-control ${className}`}
          onCompositionStart={this.handleComposition}
          onCompositionUpdate={this.handleComposition}
          onCompositionEnd={this.handleComposition}
          onChange={this.handleChange}
        />
      );
    }
  };
}

export default createFormControl;
