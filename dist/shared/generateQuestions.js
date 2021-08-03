import questions from "./questions.js";
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  let currentIndex = array.length;
  let randomIndex = 0;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex]
    ];
  }
  return shuffledArray;
};
const generateQuestions = (total = questions.length) => shuffleArray(questions.map((q) => {
  const answer = q.options[0];
  const shuffledOptions = shuffleArray(q.options);
  const generatedQuestion = {
    question: q.question,
    options: shuffledOptions,
    answerIndex: shuffledOptions.indexOf(answer)
  };
  return generatedQuestion;
})).slice(0, total);
export default generateQuestions;
