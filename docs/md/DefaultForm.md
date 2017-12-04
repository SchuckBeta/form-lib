
### 默认表单


<!--start-code-->
```js
const TextareaField = createFormControl('textarea');
const SelectField = createFormControl('select');

const model = SchemaModel({
  name: StringType().isEmail('请输入正确的邮箱')
});

class DefaultForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: 'abc',
        status: 0
      },
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { values } = this.state;
    if (!this.form.check()) {
      console.error('数据格式有错误');
      return;
    }
    console.log(values, '提交数据');
  }
  render() {
    const { errors, values } = this.state;
    return (
      <div>
        <Form
          ref={ref => this.form = ref}
          onChange={(values) => {
            console.log(values);
            this.setState({ values });
            // 清除表单所有的错误信息
            this.form.cleanErrors();
          }}
          onCheck={(errors) => {
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
}

ReactDOM.render(<DefaultForm />);

```
<!--end-code-->

使用原生的表单元素时候，需要一个 `createFormControl` 函数创建一个表单组件，主要是重写组件的 `onChange` 方法，返回组件的值，而不是 `event` 对象。

数据校验使用 `rsuite-schema`。
