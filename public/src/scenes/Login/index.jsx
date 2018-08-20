import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../common/Loading';

export default class Login extends React.PureComponent {
  render() {
    return (
      <Container>
        <h2>Login</h2>
        <Loading />
      </Container>
    );
  }
}
