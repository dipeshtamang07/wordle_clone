import { useEffect, useState, useRef } from "react";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import Navbar from "./components/navbar/Navbar";

const LETTER_CLASSES = {
  CORRECT: "correct",
  CLOSE: "close",
  INCORRECT: "incorrect",
}

function getDefaultMatrix() {
  return [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function getAllWords() {
  const response = await fetch("word-bank.txt");
  const data = await response.text();
  let words = data.split("\n");
  words = words.map(word => word.toUpperCase());
  return words;
}

function App() {
  const [wordBank, setWordBank] = useState(["APPLE", "ZEBRA"]);
  const [wordsMatrix, setWordsMatrix] = useState(getDefaultMatrix);
  const [classMatrix, setClassMatrix] = useState(getDefaultMatrix);
  const [pointer, setPointer] = useState({ wordIndex: 0, letterIndex: 0 });
  const [correctWord, setCorrectWord] = useState("");
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyColorMap, setKeyColorMap] = useState({
    correct: [],
    close: [],
    incorrect: []
  })

  const appDivRef = useRef();

  const handleWordSubmit = () => {
    const inputWord = wordsMatrix[pointer.wordIndex].join("");
    if (!wordBank.includes(inputWord)) {
      alert("Not a word, try again");
      const newMatrix = [...wordsMatrix];
      newMatrix[pointer.wordIndex] = ["", "", "", "", ""];
      setWordsMatrix(newMatrix)
      setPointer(prev => (
        { wordIndex: prev.wordIndex, letterIndex: 0 }
      ))
      return;
    }
    const classes = [];
    const newKeyColorMap = {...keyColorMap};
    for (let i = 0; i < inputWord.length; i++) {
      const inputLetter = inputWord[i];
      const regex = new RegExp(inputLetter, "g")
      let countOfCharInCorrectWord = correctWord.match(regex)?.length || 0;
      let countOfCharInInputWord = inputWord.match(regex)?.length || 0;
      let countOfCharSoFar = inputWord.slice(0, i + 1).match(regex)?.length || 0;
      // console.log({ inputLetter, countOfCharSoFar, inputWord: inputWord.slice(0, i + 1)});
      // console.log({ inputLetter, countOfCharInCorrectWord, countOfCharInInputWord });
      if (inputLetter === correctWord[i]) {
        // console.log("CORRECT", correctWord[i])
        classes.push(LETTER_CLASSES.CORRECT);
        newKeyColorMap.correct.push(inputLetter);
        if (countOfCharInInputWord > countOfCharInCorrectWord) {
          classes[inputWord.indexOf(inputLetter)] = LETTER_CLASSES.INCORRECT;
        }
      } else if (correctWord.includes(inputLetter) && countOfCharSoFar <= countOfCharInCorrectWord) {
        classes.push(LETTER_CLASSES.CLOSE);
        newKeyColorMap.close.push(inputLetter);
      } else {
        classes.push(LETTER_CLASSES.INCORRECT);
        newKeyColorMap.incorrect.push(inputLetter);
      }
    }
    const newclassMatrix = [...classMatrix];
    newclassMatrix[pointer.wordIndex] = classes;
    setClassMatrix(newclassMatrix);
    setKeyColorMap(newKeyColorMap);
    if (inputWord === correctWord) {
      setAnswered(true);
      return;
    }

    // Game Over
    if (pointer.wordIndex === 5) {
      // alert("Game Over, the word was " + correctWord);
      setGameOver(true);
      return;
    }

    setPointer(prev => (
      { wordIndex: prev.wordIndex + 1, letterIndex: 0 }
    ))
  }

  const onKeyEntry = (pressedKey) => {
    if (pressedKey === "Enter" && pointer.wordIndex < 6 && pointer.letterIndex > 4) {
      handleWordSubmit()
    }
    if (pressedKey === "Backspace" && pointer.letterIndex > 0) {
      const newMatrix = [...wordsMatrix];
      newMatrix[pointer.wordIndex][pointer.letterIndex - 1] = "";
      setWordsMatrix(newMatrix);
      setPointer(prev => (
        { ...prev, letterIndex: prev.letterIndex - 1 }
      ))
    }
    if (pointer.letterIndex > 4 || pointer.wordIndex > 5) return;
    pressedKey = pressedKey.toUpperCase();
    if (ALPHABETS.includes(pressedKey)) {
      const newMatrix = [...wordsMatrix];
      // console.log(newMatrix[pointer.wordIndex][pointer.letterIndex])
      newMatrix[pointer.wordIndex][pointer.letterIndex] = pressedKey;
      setWordsMatrix(newMatrix)
      // console.log(pointer)
      setPointer(prev => (
        { ...prev, letterIndex: prev.letterIndex + 1 }
      ))
    }
  }

  const handleKeyDown = event => {
    const pressedKey = event.key;
    onKeyEntry(pressedKey);
  }

  const restartGame = () => {
    setWordsMatrix(getDefaultMatrix());
    setClassMatrix(getDefaultMatrix());
    setPointer({ wordIndex: 0, letterIndex: 0 });
    setAnswered(false);
    appDivRef.current.focus();
    setCorrectWord(wordBank[Math.floor(Math.random() * wordBank.length)]);
    setKeyColorMap({ correct: [], close: [], incorrect: [] });
    setGameOver(false);
  }

  useEffect(() => {
    appDivRef.current.focus();
    setIsLoading(true);
    getAllWords().then(words => {
      setWordBank(words);
      setCorrectWord(words[Math.floor(Math.random() * words.length)]);
      // setCorrectWord("REEFS");
      setIsLoading(false);
    })
  }, [])

  return (
    <div className="App" tabIndex={-1} onKeyDown={handleKeyDown} ref={appDivRef}>
      <Navbar />
      {isLoading && <h3>Loading...</h3>}
      {/* <h3 style={{ color: "white"}}>{correctWord}</h3> */}
      {
        answered
        &&
        <div className="success-div">
          <h3 className="success-text">Yay, you guessed it right</h3>
          <button onClick={restartGame} className="play-again-btn">Play Again</button>
        </div>
      }
      {
        gameOver
        &&
        <div className="game-over-div">
          <h3 className="game-over-text">Game Over, The word was "{correctWord}"</h3>
          <button onClick={restartGame} className="play-again-btn">Play Again</button>
        </div>
      }
      <main className="main">
        <Board wordsMatrix={wordsMatrix} classMatrix={classMatrix} />
        <Keyboard onKeyEntry={onKeyEntry} keyColorMap={keyColorMap}/>
      </main>
    </div>
  );
}

export default App;
