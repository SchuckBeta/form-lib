### 中文输入问题

<!--start-code-->

```js
const TextareaField = createFormControl('textarea');

const model = SchemaModel({
  name: StringType().isEmail('请输入正确的邮箱')
});

class FormContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
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
    const { errors, values, inputValue } = this.state;
    return (
      <div>
        <fieldset>
          <legend>原生控件: input，onChange 会触发多次</legend>
          <input
            type="text"
            value={inputValue}
            onChange={event => {
              console.log(event.target.value);
              this.setState({
                inputValue: event.target.value
              });
            }}
            className="form-control"
          />
        </fieldset>

        <fieldset>
          <legend>form-lib 中的 Field</legend>
          <Form
            ref={ref => (this.form = ref)}
            onChange={this.props.onChange}
            onCheck={errors => {
              this.setState({ errors });
            }}
            values={this.props.formValue}
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
              <label>描述 </label>
              <Field name="description" className="form-control" accepter={TextareaField} />
            </div>
          </Form>
        </fieldset>
      </div>
    );
  }
}

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      formValue: {
        name: 'abc',
        description: 'vvvv'
      }
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const { values } = this.state;
    if (!this.form.check()) {
      console.error('数据格式有错误');
      return;
    }
    console.log(values, '提交数据');
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleOpen() {
    this.setState({ showModal: true });
  }

  handleChange(formValue) {
    this.setState({
      formValue
    });
  }

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Button shape="default" onClick={this.handleOpen}>
          打开
        </Button>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title> 测试中文输入问题</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContent formValue={this.state.formValue} onChange={this.handleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} shape="default">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<ModalContainer />);
```

<!--end-code-->
