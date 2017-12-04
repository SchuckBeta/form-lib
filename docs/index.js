
import React from 'react';
import ReactDOM from 'react-dom';
import {
  FormControl,
  Button,
  FormGroup,
  ControlLabel,
  HelpBlock,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Modal
} from 'rsuite';


import { SchemaModel, StringType, NumberType, ArrayType } from 'rsuite-schema';
import Selectpicker from 'rsuite-selectpicker';
import { PageContainer } from 'rsuite-docs';
import { Markdown } from 'react-markdown-reader';
import CodeView from 'react-code-view';


import { Form, Field, createFormControl } from '../src';

import './less/index.less';

const App = React.createClass({

  render() {

    return (
      <PageContainer
        githubURL="https://github.com/rsuite/form-lib"
        activeKey="form-lib"
      >

        <Markdown>
          {require('../README.md')}
        </Markdown>

        <h2>示例</h2>
        <CodeView
          dependencies={{
            Form,
            Field,
            createFormControl,
            SchemaModel,
            StringType
          }}
        >
          {require('./md/DefaultForm.md')}
        </CodeView>

        <CodeView
          dependencies={{
            Form,
            Field,
            createFormControl,
            SchemaModel,
            StringType,
            ArrayType,
            FormControl,
            Button,
            FormGroup,
            ControlLabel,
            HelpBlock,
            CheckboxGroup,
            Checkbox,
            RadioGroup,
            Radio
          }}
        >
          {require('./md/RSuiteForm.md')}
        </CodeView>

        <CodeView
          dependencies={{
            Form,
            Field,
            createFormControl,
            SchemaModel,
            StringType,
            Button,
            FormGroup,
            ControlLabel,
            HelpBlock,
            Selectpicker,
            NumberType
          }}
        >
          {require('./md/CustomFieldForm.md')}
        </CodeView>


        <CodeView
          dependencies={{
            Form,
            Field,
            createFormControl,
            SchemaModel,
            StringType,
            FormControl,
            Button,
            FormGroup,
            ControlLabel,
            HelpBlock
          }}
        >
          {require('./md/CustomCheckForm.md')}
        </CodeView>

        <CodeView
          dependencies={{
            Form,
            Field,
            createFormControl,
            SchemaModel,
            StringType,
            Modal,
            Button
          }}
        >
          {require('./md/ModalForm.md')}
        </CodeView>

        <Markdown>
          {require('./md/props.md')}
        </Markdown>

      </PageContainer>

    );
  }
});

ReactDOM.render(<App />,
  document.getElementById('app')
);
