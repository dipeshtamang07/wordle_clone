import React from 'react'
import Key from './Key'
import classes from "./Keyboard.module.css"

const keyRows = ["QWERTYUIOP", "ASDFGHJKL"];
const lastKeyRow = "ZXCVBNM";

function Keyboard({ onKeyEntry }) {
    return (
        <div className={classes.keyboard}>
            {
                keyRows.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className={classes.row}>
                            {
                                row.split("").map((letter, letterIndex) => <Key value={letter} key={letterIndex} onKeyEntry={onKeyEntry}/>)
                            }
                        </div>
                    )
                })
            }

            {/* Last row */}
            <div className={classes.row}>
                <Key value="Enter" bigKey onKeyEntry={onKeyEntry}/>
                {
                    lastKeyRow
                        .split("")
                        .map(letter => <Key value={letter} key={letter} onKeyEntry={onKeyEntry}/>)
                }
                <Key value="Backspace" bigKey onKeyEntry={onKeyEntry}/>
            </div>
        </div>
    )
}

export default Keyboard