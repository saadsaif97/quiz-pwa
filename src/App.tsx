import { useState, useRef, useEffect } from 'react'

import { Button, Flex } from './components/StyledComponents'

import { getQuestions } from './API'
import QuestionCard from './components/QuestionCard'
import { getShuffledArray } from './utils/utils'

function App() {
  const card = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleClick = (e: any) => {
    // if click is in the card do nothing
    if (card.current.contains(e.target)) return

    // outside click, deselect answer and remove active class
    setSelected(undefined)
    setActiveIndex(-1)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const [score, setScore] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [selected, setSelected] = useState(undefined)
  const [gameOver, setGameOver] = useState(true)
  const [loading, setLoading] = useState(true)
  const [questionNum, setQuestionNum] = useState(0)
  const [questions, setQuestions] = useState<any>([])
  const [answers, setAnswers] = useState<any>([])

  const startGame = async () => {
    const data = await getQuestions()
    setQuestions(data.results)
    setLoading(false)
    setAnswers(
      getShuffledArray([
        data.results[0].correct_answer,
        ...data.results[0].incorrect_answers,
      ])
    )
    setCorrectAnswer(data.results[0].correct_answer)
    setQuestionNum(0)
    setSelected(undefined)
    setGameOver(false)
    setScore(0)
    setActiveIndex(-1)
  }

  const next = () => {
    if (questionNum === 9 && selected) {
      startGame()
    }

    if (questionNum >= 0 && questionNum < 9) {
      setQuestionNum((prev) => prev + 1)
      setAnswers(
        getShuffledArray([
          questions[questionNum + 1].correct_answer,
          ...questions[questionNum + 1].incorrect_answers,
        ])
      )
      setCorrectAnswer(questions[questionNum + 1].correct_answer)
      // deselect answer and remove active class
      setSelected(undefined)
      // increase score if answer is correct
      setActiveIndex(-1)
      if (selected === correctAnswer) {
        setScore(score + 1)
      }
    }
  }

  const previous = () => {
    if (questionNum > 0 && questionNum <= 9) {
      setQuestionNum((prev) => prev - 1)
      setAnswers([
        questions[questionNum - 1].correct_answer,
        ...questions[questionNum - 1].incorrect_answers,
      ])
      setCorrectAnswer(questions[questionNum - 1].correct_answer)
      // deselect answer and remove active class
      setSelected(undefined)
      setActiveIndex(-1)
    }
  }

  return (
    <Flex ref={card} width='400px' height='max-content'>
      <h1>Quiz App</h1>
      <h1>{correctAnswer}</h1>
      <h1>{selected}</h1>
      <h1>{score}</h1>
      {gameOver && (
        <Button onClick={() => startGame()} style={{ margin: '20px 0' }}>
          Start quiz
        </Button>
      )}
      {loading ? (
        <h1>Click Start button to Start quiz</h1>
      ) : (
        <QuestionCard
          questionNum={questionNum}
          next={next}
          previous={previous}
          questions={questions}
          answers={answers}
          selected={selected}
          setSelected={setSelected}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
    </Flex>
  )
}

export default App
