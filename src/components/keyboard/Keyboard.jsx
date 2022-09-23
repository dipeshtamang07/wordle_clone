import React from 'react'
import Key from './Key'
import classes from "./Keyboard.module.css"

const keyRows = ["QWERTYUIOP", "ASDFGHJKL"];
const lastKeyRow = "ZXCVBNM";

function Keyboard({ onKeyEntry, keyColorMap }) {

    const getColorClass = (key) => {
        // console.log(keyColorMap);
        if (keyColorMap.correct.includes(key)) {
            return "correct"
        } else if(keyColorMap.close.includes(key)) {
            return "close"
        } else if (keyColorMap.incorrect.includes(key)) {
            return "incorrect"
        } else {
            return ""
        }
    }

    return (
        <div className={classes.keyboard}>
            {
                keyRows.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className={classes.row}>
                            {
                                row.split("").map((letter, letterIndex) => <Key value={letter} key={letterIndex} onKeyEntry={onKeyEntry} colorClass={getColorClass(letter)}/>)
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
                        .map(letter => <Key value={letter} key={letter} onKeyEntry={onKeyEntry} colorClass={getColorClass(letter)}/>)
                }
                <Key value="Backspace" label="Delete" bigKey onKeyEntry={onKeyEntry}/>
            </div>
        </div>
    )
}

export default Keyboard;