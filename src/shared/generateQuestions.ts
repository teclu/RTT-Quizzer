import type { Question, GeneratedQuestion } from './types';
import questions from './questions';

/*
 * Fisher-Yates Shuffle.
 */
const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const shuffledArray: Array<T> = [...array];
  let currentIndex: number = array.length;
  let randomIndex = 0;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  return shuffledArray;
};

const generateQuestions = (
  total: number = questions.length,
): Array<GeneratedQuestion> =>
  shuffleArray<GeneratedQuestion>(
    questions.map((q: Question): GeneratedQuestion => {
      const answer: string = q.options[0];
      const shuffledOptions: Array<string> = shuffleArray<string>(q.options);
      const generatedQuestion: GeneratedQuestion = {
        question: q.question,
        options: shuffledOptions,
        answerIndex: shuffledOptions.indexOf(answer),
      };
      return generatedQuestion;
    }),
  ).slice(0, total);

export default generateQuestions;
