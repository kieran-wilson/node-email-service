import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../common/Loading';

export default class Dashboard extends React.PureComponent {
  render() {
    return (
      <Container>
        <h2>Dashboard</h2>
        <Loading />
      </Container>
    );
  }
}
