import React from 'react'
import classes from "./Board.module.css"

function Board({ wordsMatrix, classMatrix }) {
    return (
        <div className={classes.board}>
            {
                wordsMatrix.map((word, wordIndex) => {
                    return (
                        <div key={wordIndex} className={classes.word}>
                            {
                                word.map((letter, letterIndex) => {
                                    return (
                                        <span
                                            key={letterIndex}
                                            className={`${classes.letter} ${classMatrix[wordIndex][letterIndex]}`}
                                        >
                                            {letter}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Board