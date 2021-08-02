export type Question = {
  question: string;
  options: Array<string>; // Answer is placed at index 0.
};

export type GeneratedQuestion = {
  answerIndex: number;
} & Question;
