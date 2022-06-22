import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ active = false, progress = 0, width = 1200}) => {
  const titleSize = width > 600 ? 30 : 22
  return (
    <header style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, ${active ? progress : 1}), rgba(0, 0, 0, 0))` }}>
      <span className={styles.name}
        style={{
          left: `${active & progress > 0 ? 20 - 18 * progress : 2}%`,
          top: `${active & progress > 0? 300 - 300 * progress : 0}%`,
          fontSize: active & progress > 0 ? 80 - 50 * progress : titleSize
        }}>Matthew B. Bone</span>
      <div className={styles.headerButtons}>
        <Link to={"/"} className={styles.link}>
          About Me
        </Link>
        <Link to={"/blog"} className={styles.link}>
          Blog
        </Link>
      </div>
    </header>
  )
}

export default NavBar;