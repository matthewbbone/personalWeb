import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ active = false, progress = 0, width = 1200}) => {
  const web = width > 600
  const titleSize = web ? 30 : 22
  const topMargin = web ? 0 : 7
  return (
    <header style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, ${active ? progress : 1}), rgba(0, 0, 0, 0))` }}>
      <span className={styles.name}
        style={{
          left: `${active & progress >= 0  & web ? 16 - 14 * progress : 2}%`,
          top: `${active & progress >= 0  & web ? 150 + topMargin - 150 * progress : topMargin}%`,
          fontSize: active & progress >= 0 & web ? 30 + titleSize - 30 * progress : titleSize
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