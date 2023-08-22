import React, { Component } from 'react';
import styles from './Footer.module.css';
import LinkedIn from '../../assets/icons/linkedin.png'
import Github from '../../assets/icons/github.png'

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className={styles.socialLinks}>
          <div>matthewbbone@gmail.com</div>
          <a href="https://www.linkedin.com/in/matthew-bone-05a73a160/" target="_blank">
            <img src={LinkedIn} width="20px" height="20px" className={styles.social} />
          </a>
          <a href="https://github.com/matthewbbone" target="_blank">
            <img src={Github} width="20px" height="20px" className={styles.social} />
          </a>
        </div>
      </footer>
    )
  }
}
export default Footer;