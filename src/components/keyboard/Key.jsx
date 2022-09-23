import React from 'react'
// import classes from "./Key.module.css"

function Key({ value, label, bigKey, onKeyEntry, colorClass }) {
  return (
    <div onClick={() => onKeyEntry(value)} className={bigKey ? `key bigKey` : `key ${colorClass}`}>
        {label || value}
    </div>
  )
}

export default Key