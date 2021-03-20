export const getQuestions = async () => {
  const endPoint =
    'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'

  const data = await (await fetch(endPoint)).json()
  return data
}
