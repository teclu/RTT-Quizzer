import type { Question, GeneratedQuestion } from './types';
import questions from './questions';

/*
 * Fisher-Yates Shuffle
 */
const shuffleArray = <T>(array: Array<T>): Array<T> => {
  let currentIndex: number = array.length;
  let randomIndex: number = 0;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
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
