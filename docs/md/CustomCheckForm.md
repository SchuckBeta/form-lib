在某些情况下不需要对表单数据进行实时校验，可以自定义控制校验的方式，配置 `checkTrigger` 参数。

`checkTrigger` 默认值是 `'change'`， 选项包括：

- `'change'` : 数据改变 `onChange` 的时候会触发数据校验。
- `'blur'` : 组件失去焦点触发校验
- `null` : 不触发校验，只会在调用 `<Form>` 的 `check()` 方便的时候才会校验

还可以设置校验延迟时间 `checkDelay`, 默认值为 `500` 毫秒。

以下是一个组件失去焦点触发校验的示例 `checkTrigger='blur'` :


```js
import React from 'react';
import { Form, Field, createFormControl } from 'form-lib';
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
```
