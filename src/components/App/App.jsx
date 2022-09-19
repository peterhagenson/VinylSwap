import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddInventoryPage from '../AddInventoryPage/AddInventoryPage';
import SearchPage from '../SearchPage/SearchPage';
import ProfileCompletionPage from '../ProfileCompletionPage/ProfileCompletionPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import AlbumDetailPage from '../AlbumDetailPage/AlbumDetailPage';
import WelcomePage from '../WelcomePage/WelcomePage';
import TraderPage from '../TraderPage/TraderPage';
import CompleteAddInventory from '../CompleteAddInventory/CompleteAddInventory';
import Threads from '../Threads/Threads';
import Messages from '../Messages/Messages';



import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>


        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"

          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* <ProtectedRoute

            exact
            path="/detail/:id">

            <AlbumDetailPage />
          </ProtectedRoute> */}



          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/welcome" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }

          </Route>
          <ProtectedRoute exact path="/addInventory">
            <AddInventoryPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/completeAddInventory/:id">
            <CompleteAddInventory />
          </ProtectedRoute>
          <Route exact path="/search">
            <SearchPage />
          </Route>
          <ProtectedRoute exact path="/detail/:id">
            <AlbumDetailPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/traderPage/:id">
            <TraderPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profileCompletion">
            <ProfileCompletionPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/userProfile">
            <UserProfilePage />
          </ProtectedRoute>
          <Route exact path="/welcome">
            <WelcomePage />
          </Route>
          <ProtectedRoute exact path="/threads">
            <Threads />
          </ProtectedRoute>
          <ProtectedRoute exact path="/messages/:id">
            <Messages />
          </ProtectedRoute>



          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
