import React from 'react';
import { withForm } from 'components/Form';
import { nilOrEmpty } from 'utils/ramdaUtils';
import FormLayout from './components/FormLayout';

class SendEmail extends React.PureComponent {
  constructor(props) {
    super(props);
    props.setFormValidator(this.validator);
  }

  validator = values => {
    return {
      toAddress: nilOrEmpty(values.toAddress)
        ? new Error('Must enter atleast one email address')
        : null,
      emailBody: nilOrEmpty(values.emailBody)
        ? new Error('Email body is empty')
        : null
    };
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return <FormLayout onSubmit={this.handleSubmit} />;
  }
}

export default withForm(SendEmail);
