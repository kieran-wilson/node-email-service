import React from 'react';
import { isEmpty, pathOr } from 'ramda';
import { Alert } from 'reactstrap';
import { withForm } from 'components/Form';
import { nilOrEmpty } from 'utils/ramdaUtils';
import emailService from 'data/api/emailService';
import FormLayout from './components/FormLayout';
import { Error as ErrorMessage } from '../../common/Error';

class SendEmail extends React.PureComponent {
  state = {
    response: null,
    submitting: null,
    error: null
  };

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

  handleSubmit = async event => {
    event.preventDefault();
    if (isEmpty(this.props.formErrors)) {
      this.setState({ submitting: true, response: null, error: null });
      try {
        const response = await emailService.sendEmail({
          to: this.props.formValues.toAddress,
          subject: this.props.formValues.subject,
          message: this.props.formValues.emailBody,
          bcc: this.props.formValues.bccAddress,
          cc: this.props.formValues.ccAddress
        });
        this.setState({ submitting: false, response: response.data });
        this.props.resetForm();
      } catch (error) {
        this.setState({
          submitting: false,
          error: pathOr(error.message, ['response', 'data'], error)
        });
      }
    } else {
      this.props.setAllTouched();
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.error && <ErrorMessage error={this.state.error} />}
        {this.state.response && (
          <Alert color="success">{this.state.response}</Alert>
        )}
        <FormLayout onSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}

export default withForm(SendEmail);
