import React from 'react';
import { withForm } from 'components/Form';
import { nilOrEmpty } from 'utils/ramdaUtils';
import FormLayout from './components/FormLayout';
import { isEmpty } from 'ramda';
import emailService from 'data/api/emailService';

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
        : null,
      subject: nilOrEmpty(values.subject)
        ? new Error('Email subject is empty')
        : null
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    if (isEmpty(this.props.formErrors)) {
      emailService.sendEmail({
        to: this.props.formValues.toAddress,
        subject: this.props.formValues.subject,
        message: this.props.formValues.emailBody,
        bcc: this.props.formValues.bccAddress,
        cc: this.props.formValues.ccAddress
      });
    } else {
      this.props.setAllTouched();
    }
  };

  render() {
    return <FormLayout onSubmit={this.handleSubmit} />;
  }
}

export default withForm(SendEmail);
