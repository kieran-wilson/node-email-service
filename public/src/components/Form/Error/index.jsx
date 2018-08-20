import React, { PureComponent } from 'react';
import { formConsumer } from '../index';

const extractErrorObject = error => {
  switch (true) {
    case error instanceof Error:
      return error.message;
    case error instanceof String:
      return error;
    default:
      return false;
  }
};

class ErrorMessage extends PureComponent {
  render() {
    const { errors, touched, name } = this.props;
    const hasBeenTouched = touched[name];
    const errorMessage = extractErrorObject(errors[name]);
    return hasBeenTouched && errorMessage ? (
      <span className="invalid-feedback">{errorMessage}</span>
    ) : null;
  }
}

export default formConsumer(ErrorMessage);
