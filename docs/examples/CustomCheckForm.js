import React from 'react';
import { Form, Field, createFormControl } from '../../src';
import { SchemaModel, StringType, ArrayType } from 'rsuite-schema';
import { FormControl, Button, FormGroup, ControlLabel, HelpBlock } from 'rsuite';

const model = SchemaModel({
  name: StringType().isEmail('请输入正确的邮箱')
});

const CustomField = ({ name, label, accepter, error, ...props }) => (
  <FormGroup className={error ? 'has-error' : ''}>
    <ControlLabel>{label} </ControlLabel>
    <Field name={name} accepter={accepter} {...props} />
    <HelpBlock className={error ? 'error' : ''}>{error}</HelpBlock>
  </FormGroup>
);

const CustomCheckForm = React.createClass({
  getInitialState() {
    return {
      values: {
        name: 'abc',
        skills: [2, 3],
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
            console.log(values);
          }}
          onCheck={errors => this.setState({ errors })}
          defaultValues={values}
          model={model}
          checkTrigger='blur'
          >
          <CustomField
            name="name"
            label="邮箱"
            accepter={FormControl}
            error={errors['name']}
          />
          <Button shape='primary' onClick={this.handleSubmit}> 提交 </Button>
        </Form>
      </div>
    );
  }
});

export default CustomCheckForm;
