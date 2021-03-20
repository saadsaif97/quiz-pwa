import styled from 'styled-components'
import { motion } from 'framer-motion'

type FlexProps = {
  direction?: String
  align?: String
  justify?: String
  width?: String
  height?: String
}

export const Flex = styled(motion.div)<FlexProps>`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ width }) => width && ` width: ${width}; `}
  ${({ height }) => height && ` height: ${height}; `}
  ${({ direction }) => direction && ` flex-direction: ${direction}; `}
  ${({ align }) => align && ` align-items: ${align}; `}
  ${({ justify }) => justify && ` justify-content: ${justify}; `}
`

type AnswerRowProps = {
  selected?: Boolean
}

export const AnswerRow = styled(motion.p)<AnswerRowProps>`
  background-color: #e9e9e9;
  display: block;
  width: 100%;
  color: steelblue;
  padding: 10px 20px;
  margin: 0;
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: lightcyan;
    color: #333;
  }

  ${({ selected }) =>
    selected &&
    `
     background-color: lightcyan;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 1;
  `}
`
type ButtonProps = {
  primary?: Boolean
  secondary?: Boolean
}

export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  ${({ primary }) =>
    primary &&
    `
    background-color: blue
    color: white
  `}
  ${({ secondary }) =>
    secondary &&
    `
    background-color: grey;
    color: white
  `};
`
