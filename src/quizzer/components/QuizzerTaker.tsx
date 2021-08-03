import React from 'react';
import { Button, Card, Col, Row } from 'antd';

import type { GeneratedQuestion } from '../../shared/types';

import s from '../s.module.scss';

type QuizzerTakerProps = {
  generatedQuestions: Array<GeneratedQuestion>;
};

const QuizzerTaker = ({
  generatedQuestions,
}: QuizzerTakerProps): JSX.Element => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const changeToQuestion = (change: number) => (): void =>
    setCurrentIndex(currentIndex + change);

  return (
    <Card
      title={
        <Row align="middle" justify="space-between">
          <Col>
            <h2 className={s.title}>
              Question {currentIndex + 1}/{generatedQuestions.length}
            </h2>
          </Col>
          <Col>
            <Button
              type="default"
              disabled={currentIndex === 0}
              onClick={changeToQuestion(-1)}
            >
              Previous
            </Button>
            <Button
              type="primary"
              disabled={currentIndex === generatedQuestions.length - 1}
              onClick={changeToQuestion(1)}
            >
              Next
            </Button>
          </Col>
        </Row>
      }
    >
      <h1>{generatedQuestions[currentIndex].question}</h1>
      {generatedQuestions[currentIndex].options.map(
        (option: string, index: number): JSX.Element => {
          const isAnswer: boolean =
            generatedQuestions[currentIndex].answerIndex === index;
          return (
            <h2
              key={`option-${index}`}
              style={{ color: isAnswer ? 'green' : undefined }}
            >
              {option}
            </h2>
          );
        },
      )}
    </Card>
  );
};

export default QuizzerTaker;
