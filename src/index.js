import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AboutMe from './components/AboutMe/AboutMe';
import ReactDOM from 'react-dom';
import styles from "./index.module.css"
import Blog from './components/Blog/Blog';

class App extends Component {

  render() {
    return (
      <Router>
          <Route exact path="/" component={AboutMe} />
          <Route path="/blog" component={Blog} />
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));