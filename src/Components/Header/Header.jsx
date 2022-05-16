import React from 'react'
import  styles from './Header.module.css'
import resumelogo from "./resumelogo.svg"
import logo from "./img2.svg"



function Header() {
  return (
      <>
    <div class={styles.navbar}>
    <img src={resumelogo} alt=""/>
    <a class={styles.logo}>Resume-<span>Builder</span>.com</a>
    </div>
    <div className={styles.container}>
    <div className={styles.left}>
      <p className={styles.heading}>
        A <span>Resume</span> that stands out!
      </p>
      <p className={styles.heading}>
        Make your own resume. <span>It's free</span>
      </p>
    </div>
    <div className={styles.right}>
      <img src={logo} alt="Resume" />
    </div>
  </div>
  </>
);
}

export default Header