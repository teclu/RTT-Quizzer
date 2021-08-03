import React from 'react';

import type { GeneratedQuestion, Settings } from '../shared/types';
import { Status } from '../shared/enums';
import generateQuestions from '../shared/generateQuestions';
import QuizzerSetup from './components/QuizzerSetup';
import QuizzerTaker from './components/QuizzerTaker';

const DEFAULT_SETTINGS: Settings = {
  numberOfQuestions: 70,
};

const Quizzer = (): JSX.Element => {
  const [generatedQuestions, setGeneratedQuestions] = React.useState<
    Array<GeneratedQuestion>
  >([]);
  const [settings, setSettings] = React.useState<Settings>(DEFAULT_SETTINGS);
  const [status, setStatus] = React.useState<Status>(Status.Setup);

  React.useEffect((): void => {
    if (status === Status.Setup && generateQuestions.length > 0) {
      setGeneratedQuestions([]);
    } else if (status === Status.Quiz) {
      setGeneratedQuestions(generateQuestions(settings.numberOfQuestions));
    }
  }, [status]);

  if (status >= Status.Quiz && generatedQuestions.length > 0) {
    return (
      <QuizzerTaker
        generatedQuestions={generatedQuestions}
        status={status}
        setStatus={setStatus}
      />
    );
  }
  return (
    <QuizzerSetup
      settings={settings}
      setStatus={setStatus}
      setSettings={setSettings}
    />
  );
};

export default Quizzer;
