import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import routes from 'config/routes';
import Dashboard from 'scenes/Dashboard';
import Login from 'scenes/Login';
import SendEmail from 'scenes/SendEmail';
import Header from 'common/Header';
import Footer from 'common/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <React.Fragment>
              <Header />
              <Switch location={location}>
                <Route exact path={routes.ROUTES.LOGIN} component={Login} />
                <Route
                  exact
                  path={routes.ROUTES.DASHBOARD}
                  component={Dashboard}
                />
                <Route
                  exact
                  path={routes.ROUTES.SEND_EMAIL}
                  component={SendEmail}
                />
              </Switch>
              <Footer />
            </React.Fragment>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
