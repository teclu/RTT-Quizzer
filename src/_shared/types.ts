export type GeneratedQuestion = {
  answerIndex: number;
} & Question;

export type Settings = {
  numberOfQuestions: number;
};

export type Question = {
  question: string;
  options: Array<string>; // Answer is placed at index 0.
};
