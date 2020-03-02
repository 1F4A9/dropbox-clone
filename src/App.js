import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import Favorites from "./components/Favorites";
import Auth from './components/Auth';
import { GlobalStyle } from './utilities/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/home" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/auth" component={Auth} />
        <Route path="/favorites" component={Favorites} />

      </Router>
    </>
  );
}

export default App;