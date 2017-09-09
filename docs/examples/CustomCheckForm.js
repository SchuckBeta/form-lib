import React from 'react';
import { Form, Field } from '../../src';
import { SchemaModel, StringType } from 'rsuite-schema';
import { FormControl, Button, FormGroup, ControlLabel, HelpBlock } from 'rsuite';

const model = SchemaModel({
  name: StringType().addRule((value) => {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
  }, '请输入正确的邮箱')
});

const CustomField = ({ name, label, accepter, error, ...props }) => (
  <FormGroup className={error ? 'has-error' : ''}>
    <ControlLabel>{label} </ControlLabel>
    <Field name={name} accepter={accepter} {...props} />
    <HelpBlock className={error ? 'error' : ''}>{error}</HelpBlock>
  </FormGroup>
);


class CustomCheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: 'abc'
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
            this.setState({ values });
            console.log(values);
          }}
          onCheck={(errors) => {
            this.setState({ errors });
          }}
          defaultValues={values}
          model={model}
          checkTrigger="blur"
        >
          <CustomField
            name="name"
            label="邮箱"
            accepter={FormControl}
            error={errors.name}
          />
          <Button shape="primary" onClick={this.handleSubmit}> 提交 </Button>
        </Form>
      </div>
    );
  }
}

export default CustomCheckForm;
