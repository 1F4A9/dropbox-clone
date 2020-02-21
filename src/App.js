import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Route path="/login/" component={LoginPage}/>
      <Route path="/auth/" component={Auth}/>
      <Route exact path="/" component={MainPage}/>
    </Router>
  );
}

export default App;