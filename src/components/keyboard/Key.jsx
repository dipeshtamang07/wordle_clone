import React from 'react'
import classes from "./Key.module.css"

function Key({ value, bigKey, onKeyEntry }) {
  return (
    <div onClick={() => onKeyEntry(value)} className={bigKey ? `${classes.key} ${classes.bigKey}` : classes.key}>
        {value}
    </div>
  )
}

export default Key