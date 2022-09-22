import React from 'react'
import classes from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={classes.navbar}>
        <span className={classes.gameTitle}>Wordle</span>
    </nav>
  )
}

export default Navbar