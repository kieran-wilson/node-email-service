import React from 'react';
import { Container } from 'reactstrap';
import { Form, Input, Label, Button, FormGroup } from 'reactstrap';
import { pathOr } from 'ramda';
import { Error } from 'common/Error';
import emailService from 'data/api/emailService';
import routes from '../../config/routes';

export default class Login extends React.PureComponent {
  state = {
    keyCode: '',
    submitting: false,
    error: false
  };

  onSubmit = async () => {
    this.setState({ submitting: true, error: false });
    try {
      const response = await emailService.checkKey(this.state.keyCode);
      if (response.status === 200) {
        localStorage.setItem('keycode', this.state.keyCode);
        this.props.history.push(routes.ROUTES.SEND_EMAIL);
      }
      this.setState({ submitting: false });
    } catch (error) {
      this.setState({
        submitting: false,
        error: pathOr(error.message, ['response', 'data'], error)
      });
    }
  };

  render() {
    return (
      <Container>
        <section>
          <h2>Enter the key code to send emails</h2>
          {this.state.error && <Error error={this.state.error} />}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="key">Key Code:</Label>
              <Input
                disabled={this.state.submitting}
                name="key"
                id="key"
                placeholder="Key Code"
                onChange={event =>
                  this.setState({ keyCode: event.target.value })
                }
              />
            </FormGroup>
            <Button
              disabled={this.state.submitting}
              color="primary"
              onClick={this.onSubmit}
            >
              Check Key Code
            </Button>
          </Form>
        </section>
      </Container>
    );
  }
}
