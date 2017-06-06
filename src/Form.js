import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import classNames from 'classnames';
import Field from './Field.js';
import { SchemaModel, Schema } from 'rsuite-schema';
import debounce from './utils/debounce';

const propTypes = {
  horizontal: PropTypes.bool,
  inline: PropTypes.bool,
  values: PropTypes.object,
  defaultValues: PropTypes.object,
  model: PropTypes.instanceOf(Schema),

  /**
   * 数据校验的时候，延迟处理，默认为 500 毫秒
   */
  checkDelay: PropTypes.number,

  /**
   * 数据校验的触发类型, 默认 change
   * change: 数据改变的时候触发
   * blur: 控件失去焦点时候触发
   * null: 不触发校验，但是在 调用 Form 的 check 方法的时候还是会触发
   */
  checkTrigger: PropTypes.oneOf(['change', 'blur', null]),
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onCheck: PropTypes.func,
  errors: PropTypes.object
};

const defaultProps = {
  model: SchemaModel({}),
  horizontal: false,
  inline: false,
  defaultValues: {},
  checkDelay: 500,
  checkTrigger: 'change'
};


class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: props.errors || {},
      /**
       * 把当前 values 维护到 state 中，主要为 Form 中的 check 方法
       * 默认会设置 props.values ，
       * 如果还是没有的话就默认为 {}
       */
      values: props.values || {}
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldError = debounce(this.handleFieldError.bind(this), props.checkDelay);
    this.handleFieldSuccess = debounce(this.handleFieldSuccess.bind(this), props.checkDelay);
    this.check = this.check.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.errors, this.props.errors)) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (!_.isEqual(nextProps.values, this.props.values)) {
      this.setState({
        values: nextProps.values
      });
    }
  }

  getChildContext() {
    const { defaultValues, model, checkTrigger } = this.props;
    const { errors, values } = this.state;
    return {
      _form: {
        onFieldChange: this.handleFieldChange,
        onFieldError: this.handleFieldError,
        onFieldSuccess: this.handleFieldSuccess,
        checkTrigger,
        values,
        defaultValues,
        errors,
        model
      }
    };
  }

  /**
   * 校验表单数据是否合法
   * 该方法主要提供给 Form ref 时候调用
   * return  true/false
   */
  check() {
    const { values } = this.state;
    const { defaultValues, model, onCheck, onError } = this.props;
    const errors = {};
    let errorCount = 0;

    const nextValues = Object.assign({}, defaultValues, values);
    Object.keys(model.schema).forEach(key => {
      const checkResult = model.checkForField(key, nextValues[key]);

      if (checkResult.hasError === true) {
        errorCount++;
        errors[key] = checkResult.errorMessage;
      }
    });

    this.setState({ errors });
    onCheck && onCheck(errors);
    if (errorCount > 0) {
      onError && onError(errors);
      return false;
    }

    return true;
  }

  /**
   * 验证，出现错误的回调函数
   */
  handleFieldError(name, error) {


    const { onError, onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: error
    });

    this.setState({ errors });
    onError && onError(errors);
    onCheck && onCheck(errors);
  }

  /**
   * 验证通过的回调函数
   */
  handleFieldSuccess(name) {
    const { onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: null
    });
    this.setState({ errors });
    onCheck && onCheck(errors);
  }

  /**
   * 每一次 字段数据更新回调函数
   */
  handleFieldChange(name, value) {

    const { onChange, defaultValues } = this.props;
    const values = Object.assign({}, this.state.values, defaultValues, {
      [name]: value
    });
    onChange && onChange(values);
  }

  render() {

    const {
      children,
      model,
      horizontal,
      inline,
      className
    } = this.props;

    const clesses = classNames({
      'form': true,
      'form-horizontal': horizontal,
      'form-inline': inline
    }, className);

    return (
      <form onSubmit={(e) => e.preventDefault()} className={clesses}>
        {children}
      </form>
    );
  }
}

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;
Form.childContextTypes = {
  _form: PropTypes.object.isRequired
};

export default Form;
