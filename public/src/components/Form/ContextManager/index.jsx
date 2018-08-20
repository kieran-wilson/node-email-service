import React, { PureComponent } from 'react';
import { pickBy, merge } from 'ramda';
import createContext from 'create-react-context';
import {nilOrEmpty} from '../../../utils/ramdaUtils';

const filterErrors = pickBy(d => !!d);

const FormContext = createContext({
  values: {},
  errors: {},
  setValidator: () => {},
  setValue: () => {}
});

export function withForm(Component, options = {}) {
  return class FormComponent extends PureComponent {
    static defaultProps = {
      defaultValues: {}
    };

    constructor(props) {
      super(props);
      this.validator = () => {};
      this.state = {
        values: merge(options.defaultValues, props.defaultValues),
        errors: {},
        setValidator: this.setValidator,
        setValue: this.setValue,
        touched: {}
      };
    }

    render() {
      return (
        <FormContext.Provider value={this.state}>
          <FormContext.Consumer>
            {({ values, errors, setValidator, setValue, touched }) => (
              <Component
                formValues={values}
                touchedFormValues={touched}
                setFormValidator={setValidator}
                setFormValue={setValue}
                formErrors={errors}
                {...this.props}
              />
            )}
          </FormContext.Consumer>
        </FormContext.Provider>
      );
    }

    setValue = (name, value) => {
      this.setState(state => {
        let touched = state.touched;
        if (!nilOrEmpty(value)) {
          touched[name] = true;
        }
        const newValues = {
          ...state.values,
          [name]: value
        };
        return {
          values: newValues,
          errors: filterErrors(this.validator(newValues)),
          touched
        };
      });
    };

    setValidator = validatorFunc => {
      this.validator = validatorFunc;
    };
  };
}

export function formConsumer(Component) {
  return class FormConsumer extends PureComponent {
    render() {
      return (
        <FormContext.Consumer>
          {context => <Component {...context} {...this.props} />}
        </FormContext.Consumer>
      );
    }
  };
}
