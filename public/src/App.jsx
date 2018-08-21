import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import routes from 'config/routes';
import Login from 'scenes/Login';
import SendEmail from 'scenes/SendEmail';
import Header from 'common/Header';
import Footer from 'common/Footer';
import ensureLoggedIn from './components/EnsureLoggedIn'

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
                  path={routes.ROUTES.SEND_EMAIL}
                  component={ensureLoggedIn(SendEmail)}
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
