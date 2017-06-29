用 RSuite 提供的表单组件
- `<FormGroup>` 控制布局，同时在有错误的情况下，需要添加一个 `has-error` 的 `className`;
- `<ControlLabel>` 配置显示的字段名称;
- `<HelpBlock>` 配置错误信息；
- 把 RSuite 的表单组件 配置到 `<Field>` 的 `accepter` 属性上面。

```js

import React from 'react';
import { Form, Field, createFormControl } from 'form-lib';
import { SchemaModel, StringType, ArrayType } from 'rsuite-schema';
import {
  FormControl, Button, FormGroup,
  ControlLabel, HelpBlock, CheckboxGroup, Checkbox
} from 'rsuite';

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
            errors={errors['name']}
          />

          <CustomField
            name="status"
            label="状态"
            accepter={FormControl}
            errors={errors['status']}
            componentClass="select"
          >
            <option value={1}>启用</option>
            <option value={0}>禁用</option>
          </CustomField>

          <CustomField
            name="skills"
            label="技能"
            accepter={CheckboxGroup}
            errors={errors['skills']}
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
```
<br/>
> `FormGroup` 中有很多重复的配置项，所以可以创建一个 `CustomField` 组件。

```js
const CustomField = ({ name, label, accepter, error, ...props }) => (
  <FormGroup className={error ? 'has-error' : ''}>
    <ControlLabel>{label} </ControlLabel>
    <Field name={name} accepter={accepter} {...props} />
    <HelpBlock className={error ? 'error' : ''}>{error}</HelpBlock>
  </FormGroup>
);
```
