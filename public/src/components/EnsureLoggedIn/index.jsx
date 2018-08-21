import React, { PureComponent } from 'react';
import routes from 'config/routes';

function ensureLoggedIn(WrappedComponent) {
  return class EnsureLoggedIn extends PureComponent {
    async componentDidMount() {
      if (!localStorage.getItem('keycode')) {
        this.props.history.push(routes.ROUTES.LOGIN);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default ensureLoggedIn;
