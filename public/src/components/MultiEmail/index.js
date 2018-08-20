import React from 'react';
import {
  map,
  toLower,
  __,
  contains,
  when,
  pipe,
  path,
  assocPath,
  append,
  filter
} from 'ramda';
import { Container, Row, Col, Badge } from 'reactstrap';

import './style.css';

//eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validEmail = value => emailRegex.test(toLower(value));
const respondsKeyCodes = [13, 188, 32];
const shouldTest = pipe(
  path(['keyCode']),
  contains(__, respondsKeyCodes)
);

export default class MultiEmail extends React.PureComponent {
  static defaultProps = {
    className: 'multi-email'
  };

  state = {
    currentInput: ''
  };

  constructor(props) {
    super(props);
  }

  removeEmail(email) {
    const newList = filter(value => value !== email, this.props.value);
    const event = {
      preventDefault: () => {},
      target: {
        value: newList
      }
    };
    this.props.onChange(assocPath(['target', 'value'], newList, event));
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      currentInput: event.target.value.replace(/[\s,]/g, '')
    });
  };

  addEmail = event => {
    if (validEmail(this.state.currentInput)) {
      const emails = append(this.state.currentInput, this.props.value);
      this.props.onChange(assocPath(['target', 'value'], emails, event));
      this.setState({ currentInput: '' });
    }
  };

  handleKeyPress = event => {
    when(shouldTest, this.addEmail)(event);
  };

  render() {
    const { className, value, invalid } = this.props;

    return (
      <Container
        className={`${className} form-control py-0 ${
          invalid ? ' is-invalid' : ''
        }`}
      >
        <Row>
          {map(
            email => (
              <Col xs="auto" className="px-2" key={email}>
                <Badge
                  color="info"
                  className={`${className}--email`}
                  onClick={() => this.removeEmail(email)}
                >
                  {email}
                  <button
                    type="button"
                    className={`${className}--remove close`}
                    aria-label="Remove"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </Badge>
              </Col>
            ),
            value
          )}
          <Col className="px-1">
            <input
              ref={node => (this.node = node)}
              onKeyUp={this.handleKeyPress}
              className={`${className}--input`}
              onChange={this.handleChange}
              value={this.state.currentInput}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
