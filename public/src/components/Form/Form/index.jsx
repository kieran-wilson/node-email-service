import React, { PureComponent } from 'react';
import { forEachObjIndexed, unless, isNil, omit } from 'ramda';
import { formConsumer } from '../index';

class Form extends PureComponent {
  constructor(props) {
    super(props);
    unless(isNil, props.setValidator)(props.validator);
    forEachObjIndexed(
      (name, value) => props.setValue(name, value),
      props.defaultValues
    );
  }

  render() {
    const { component: Component } = this.props;
    const rest = omit(
      [
        'component',
        'validator',
        'defaultValues',
        'values',
        'errors',
        'setValidator',
        'setValue'
      ],
      this.props
    );

    return <Component {...rest} />;
  }
}

export default formConsumer(Form);
