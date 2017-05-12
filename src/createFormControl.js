import React from 'react';

function createFormControl(Component) {

  return class extends React.Component {
    handleChange(e) {
      const { onChange } = this.props;
      onChange && onChange(e.target.value);
    }
    render() {
      return (
        <Component
          {...this.props}
          onChange={this.handleChange.bind(this)}
        />
      );
    }
  };
}

export default createFormControl;
