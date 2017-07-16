import React from 'react';
import { Form, Field, createFormControl } from '../../src';
import { SchemaModel, StringType } from 'rsuite-schema';

const TextareaField = createFormControl('textarea');
const SelectField = createFormControl('select');

const model = SchemaModel({
  name: StringType().isEmail('请输入正确的邮箱')
});

const DefaultForm = React.createClass({
  getInitialState() {
    return {
      values: {
        name: 'abc',
        status: 0
      },
      errors: {}
    };
  },
  handleSubmit() {
    const { values } = this.state;
    if (!this.form.check()) {
      console.error('数据格式有错误');
      return;
    }
    console.log(values, '提交数据');
  },
  render() {
    const { errors, values } = this.state;
    return (
      <div>
        <Form
          ref={ref => this.form = ref}
          onChange={(values) => {
            this.setState({ values });
            console.log(values, 'values');
          }}
          onCheck={(errors) => {
            console.log(errors, 'errors');
            this.setState({ errors });
          }}
          values={values}
          model={model}
        >
          <div className="form-group">
            <label>邮箱: </label>
            <Field name="name" className="form-control" />
            <span className="help-block error" style={{ color: '#ff0000' }}>
              {errors.name}
            </span>
          </div>

          <div className="form-group">
            <label>状态: </label>
            <Field name="status" className="form-control" accepter={SelectField} >
              <option value={1}>启用</option>
              <option value={0}>禁用</option>
            </Field>
          </div>

          <div className="form-group">
            <label>描述 </label>
            <Field name="description" className="form-control" accepter={TextareaField} />
          </div>

          <button onClick={this.handleSubmit}> 提交 </button>
        </Form>
      </div>
    );
  }
});

export default DefaultForm;
