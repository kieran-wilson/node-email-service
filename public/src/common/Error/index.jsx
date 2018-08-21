import React from 'react';
import { Alert } from 'reactstrap';

export const Error = ({ error }) => (
  <div>
    <Alert color="danger">{error}</Alert>
  </div>
);
