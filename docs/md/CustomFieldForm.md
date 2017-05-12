如果一个组件不是原生表单控件，也不是 `RSuite` 库中提供的基础组件，要在 `form-lib` 中使用，应该怎么处理呢？

只需要在写这个组件的时候实现对应的 API 就可以了，

- `value` : 受控时候设置的值
- `defalutValue`: 默认值，非受控情况先设置的值
- `onChange`: 组件数据发生改变的回调函数
- `onBlur`: 在失去焦点的回调函数

接下来我们使用 `rsuite-picker` 单选 作为示例, 在 `rsuite-picker` 内部已经实现了这些 API。

```js
import React from 'react';
import { Form, Field, createFormControl } from 'form-lib';
import { SchemaModel, NumberType } from 'rsuite-schema';
import { FormControl, Button, FormGroup, ControlLabel, HelpBlock } from 'rsuite';
import Picker from 'rsuite-picker';


const model = SchemaModel({
  skill: NumberType()
});

const CustomField = ({ name, label, accepter, error, ...props }) => (
  <FormGroup className={error ? 'has-error' : ''}>
    <ControlLabel>{label} </ControlLabel>
    <Field name={name} accepter={accepter} {...props} />
    <HelpBlock className={error ? 'error' : ''}>{error}</HelpBlock>
  </FormGroup>
);

const CustomFieldForm = React.createClass({
  getInitialState() {
    return {
      values: {
        skill: 3,
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
            name="skill"
            label="技能"
            accepter={Picker}
            errors={errors['skill']}
            options={[
              { label: 'Node.js', value: 1 },
              { label: 'CSS3', value: 2 },
              { label: 'Javascript', value: 3 },
              { label: 'HTML5', value: 4 }
            ]}
          />
          <Button shape='primary' onClick={this.handleSubmit}> 提交 </Button>
        </Form>
      </div>
    );
  }
});

export default CustomFieldForm;
```
