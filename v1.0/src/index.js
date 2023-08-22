import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Blog from './components/blog/Blog'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import ReactDOM from 'react-dom';
import styles from "./index.module.css"

class App extends Component {

  render() {
    return (
      <Router>
        <NavBar />
        <div className={styles.pageView}>
          <Home/>
          <Blog/>
        </div>
        <Footer />
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));