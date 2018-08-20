import React, { Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input as InputStrap,
  Form as FormStrap
} from 'reactstrap';
import { Form, Input, ErrorMessage } from 'components/Form';
import './style.css';
import SlideDown from 'components/SlideDown';
import MultiEmail from '../../../../components/MultiEmail';

const arrow = down =>
  down ? <Fragment>&#x25B2;</Fragment> : <Fragment>&#x25BC;</Fragment>;

export default class FormLayout extends React.PureComponent {
  state = {
    bcc: null,
    cc: null
  };

  render() {
    const { cc, bcc } = this.state;
    const { onSubmit } = this.props;
    return (
      <Container>
        <section>
          <h2>Send an Email!</h2>
          <Form component={FormStrap} onSubmit={onSubmit}>
            <FormGroup>
              <Label for="toAddress">To address:</Label>
              <Input
                component={MultiEmail}
                defaultValue={[]}
                name="toAddress"
                id="toAddress"
                placeholder="To address"
              />
              <ErrorMessage name="toAddress" />
            </FormGroup>
            <Container className="pb-2">
              <Row>
                <Col xs="auto" className="pl-0">
                  <Button
                    color="secondary"
                    onClick={() => this.setState({ bcc: !bcc })}
                  >
                    BCC {arrow(bcc)}
                  </Button>
                </Col>
                <Col className="pr-0">
                  <FormGroup>
                    <SlideDown
                      in={bcc}
                      unmountOnExit={true}
                      mountOnEnter={true}
                    >
                      <Label for="bccAddress">BCC address:</Label>
                      <Input
                        component={MultiEmail}
                        defaultValue={[]}
                        type="email"
                        name="bccAddress"
                        id="bccAddress"
                        placeholder="BCC address"
                      />
                    </SlideDown>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
            <Container className="pb-2">
              <Row>
                <Col xs="auto" className="pl-0">
                  <Button
                    color="secondary"
                    onClick={() => this.setState({ cc: !cc })}
                  >
                    CC {arrow(cc)}
                  </Button>
                </Col>
                <Col className="pr-0">
                  <FormGroup>
                    <SlideDown in={cc} unmountOnExit={true} mountOnEnter={true}>
                      <Label for="bccAddress">CC address:</Label>
                      <Input
                        component={MultiEmail}
                        defaultValue={[]}
                        name="ccAddress"
                        id="ccAddress"
                        placeholder="CC address"
                      />
                    </SlideDown>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
            <FormGroup>
              <Label for="emailBody">Email Body</Label>
              <Input
                component={InputStrap}
                type="textarea"
                name="emailBody"
                id="emailBody"
              />
              <ErrorMessage name="emailBody" />
            </FormGroup>
            <br />
            <Button color="primary" onClick={onSubmit}>
              Send Email
            </Button>
          </Form>
        </section>
      </Container>
    );
  }
}
