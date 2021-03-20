import React from 'react'
import { motion } from 'framer-motion'
import { Flex, AnswerRow, Button } from './StyledComponents'

const cardVarients = {
  init: {
    opacity: 0,
    y: -200,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: [0.9, 1.1],
    transition: {
      duration: 0.1,
    },
  },
}

type Question = {
  category: String
  correct_answer: String
  difficulty: String
  incorrect_answers: String[]
  question: String
  type: String
}

type Props = {
  activeIndex: number
  setActiveIndex: Function
  selected: any
  setSelected: Function
  questionNum: number
  next: Function
  previous: Function
  questions: Question[]
  answers: String[]
}

const QuestionCard: React.FC<Props> = ({
  questionNum,
  next,
  previous,
  questions,
  answers,
  selected,
  setSelected,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <Flex
      align='start'
      justify='start'
      width='400px'
      style={{ marginTop: '50px' }}
      variants={cardVarients}
      initial='init'
      animate='show'
    >
      <motion.p variants={cardVarients} style={{ alignSelf: 'flex-end' }}>
        Question number: {questionNum + 1}
      </motion.p>
      <motion.h2 variants={cardVarients} style={{ marginBottom: '20px' }}>
        {questions[questionNum].question}
      </motion.h2>
      {answers.map((answer, idx) => (
        <AnswerRow
          key={idx}
          variants={cardVarients}
          whileHover='hover'
          whileTap='tap'
          onClick={() => {
            setSelected(answer)
            setActiveIndex(idx)
          }}
          selected={activeIndex === idx}
        >
          {answer}
        </AnswerRow>
      ))}
      <Flex direction='row' style={{ marginTop: '20px' }}>
        <Button
          primary={true}
          onClick={() => previous()}
          disabled={questionNum === 0 ? true : false}
        >
          Previous
        </Button>
        {selected && (
          <Button
            onClick={() => next()}
            disabled={questionNum === 10 ? true : false}
            style={{ marginLeft: '20px' }}
          >
            Next
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default QuestionCard
