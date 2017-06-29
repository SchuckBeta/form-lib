import React from 'react';
import { Form, Field, createFormControl } from '../../src';
import { SchemaModel, StringType, ArrayType } from 'rsuite-schema';
import { FormControl, Button, FormGroup, ControlLabel, HelpBlock, CheckboxGroup, Checkbox, RadioGroup, Radio } from 'rsuite';

const model = SchemaModel({
  name: StringType().isEmail('请输入正确的邮箱'),
  skills: ArrayType().minLength(1, '至少应该会一个技能')
});

const CustomField = ({ name, label, accepter, error, ...props }) => (
  <FormGroup className={error ? 'has-error' : ''}>
    <ControlLabel>{label} </ControlLabel>
    <Field name={name} accepter={accepter} {...props} />
    <HelpBlock className={error ? 'error' : ''}>{error}</HelpBlock>
  </FormGroup>
);

const RSuiteForm = React.createClass({
  getInitialState() {
    return {
      values: {
        name: 'abc',
        skills: [2, 3],
        gender: 1,
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
          model={model} >


          <CustomField
            name="name"
            label="邮箱"
            accepter={FormControl}
            error={errors['name']}
          />

          <CustomField
            name="status"
            label="状态"
            accepter={FormControl}
            error={errors['status']}
            componentClass="select"
          >
            <option value={1}>启用</option>
            <option value={0}>禁用</option>
          </CustomField>

          <CustomField
            name="skills"
            label="技能"
            accepter={CheckboxGroup}
            error={errors['skills']}
          >
            <Checkbox value={1}>Node.js</Checkbox>
            <Checkbox value={2}>Javascript</Checkbox>
            <Checkbox value={3}>CSS 3</Checkbox>
          </CustomField>

          <CustomField
            name="gender"
            label="性别"
            accepter={RadioGroup}
            error={errors['gender']}
          >
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
            <Radio value={3}>未知</Radio>
          </CustomField>



          <CustomField
            name="bio"
            label="简介"
            accepter={FormControl}
            componentClass="textarea"
            error={errors['bio']}
          />

          <Button shape='primary' onClick={this.handleSubmit}> 提交 </Button>
        </Form>
      </div>
    );
  }
});

export default RSuiteForm;
