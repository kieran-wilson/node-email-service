import React from 'react';
import { Container } from 'reactstrap';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer className="text-muted p-5 mt-5">
        <Container>
          <p>Email Service repository</p>
        </Container>
      </footer>
    );
  }
}
