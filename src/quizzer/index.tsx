import React from 'react';

import type { Settings } from '../shared/types';
import { Status } from '../shared/enums';
import generateQuestions from '../shared/generateQuestions';
import QuizzerSetup from './components/QuizzerSetup';
import QuizzerTaker from './components/QuizzerTaker';

const DEFAULT_SETTINGS: Settings = {
  numberOfQuestions: 70,
};

const Quizzer = (): JSX.Element => {
  const [settings, setSettings] = React.useState<Settings>(DEFAULT_SETTINGS);
  const [status, setStatus] = React.useState<Status>(Status.Setup);

  return status === Status.Start ? (
    <QuizzerTaker
      generatedQuestions={generateQuestions(settings.numberOfQuestions)}
    />
  ) : (
    <QuizzerSetup
      settings={settings}
      setStatus={setStatus}
      setSettings={setSettings}
    />
  );
};

export default Quizzer;
