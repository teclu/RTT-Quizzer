import React from 'react';
import Quizzer from '../components/quizzer';

import s from './s.module.scss';

const Container = (): JSX.Element => {
  return (
    <div className={s.layout}>
      <Quizzer />
    </div>
  );
};

export default Container;
