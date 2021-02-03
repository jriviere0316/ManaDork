import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage, { UserPageFuncExport } from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import EditDeck from '../EditDeck/EditDeck';
import ViewDeck from '../ViewDeck/ViewDeck';
import EditUser from '../EditUser/EditUser';
import Asyncinput from '../AsyncInput/AsyncInput';
import UserHub from '../UserHub/UserHub';
import LifeTotal from '../LifeTotal/LifeTotal';
import './App.css';
import UserDecks from '../UserDecks/UserDecks';
//import UserPage from '../UserPage/UserPage';
// import mapStateToProps from

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_DECK' });
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          {/* UNPROTECTED ROUTES */}
          <Route
            exact
            path="/about"
            component={AboutPage}
          />
          <Route
            exact
            path="/lifetotal"
            component={LifeTotal}
          />
          <Route
            // no longer using this
            exact
            path="/asyncinput"
            component={Asyncinput}
          />
          <Route
            // logged in shows ViewDeck else shows ViewDeck
            exact
            path="/viewdeck/:id"
            component={ViewDeck}
          />
          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
            component={InfoPage}
          />
          {/* For protected routes, the view could show one of several things on the same route.
          Visiting localhost:3000/user will show the UserPage if the user is logged in.
          If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
          Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          {/* NO LONGER USING THIS /user ROUTE */}
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
            component={UserPage}
          /> */}

          <ProtectedRoute
            // logged in shows UserHub else shows LoginPage
            exact
            path="/userhub"
            component={UserHub}
          />
          <ProtectedRoute
            // logged in shows EditUser else shows LoginPage
            exact
            path="/edituser"
            component={EditUser}
          />
          <ProtectedRoute
            // logged in shows EditDeck else shows LoginPage
            exact
            path="/editdeck/:id"
            component={EditDeck}
          />

          <ProtectedRoute
          // NOT CURRENTLY USING THIS ROUTE
          exact
          path="/asyncinput"
          component={Asyncinput}
          />

          {/* When a value is supplied for the authRedirect prop the user will
          be redirected to the path supplied when logged in, otherwise they will
          be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            component={LoginPage}
            authRedirect="/userHub"
          />
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/userHub"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            component={RegisterPage}
            authRedirect="/userHub"
          />
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/userHub"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            component={LandingPage}
            authRedirect="/userHub"
          />
          <ProtectedRoute
            exact
            path="/userDecks"
            component={UserDecks}
            authRedirect="/userHub"
          />
          {/* If none of the other routes matched, we will show a 404. */}
          <Route render={() => <h1>404</h1>} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
});

export default connect(mapStateToProps)(App);
