import React, { PureComponent } from 'react';
import { pathOr } from 'ramda';
import { formConsumer } from '../index';

class Input extends PureComponent {
  constructor(props) {
    super(props);
    props.setValue(props.name, pathOr('', ['defaultValue'], props));
  }

  render() {
    const {
      values,
      setValue,
      component: Component,
      children,
      name,
      /* eslint-disable no-unused-vars */
      setValidator,
      errors,
      touched,
      defaultValue,
      /* eslint-enable no-unused-vars */
      ...rest
    } = this.props;
    const error = !!touched[name] && !!errors[name];
    return (
      <Component
        name={name}
        value={values[name] || ''}
        touched={!!touched[name]}
        invalid={error}
        onChange={event => {
          event.preventDefault();
          setValue(name, event.target.value);
        }}
        {...rest}
      >
        {children}
      </Component>
    );
  }
}

export default formConsumer(Input);
