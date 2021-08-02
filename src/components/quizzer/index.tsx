import React from 'react';
import { Button, Card, Col, Row } from 'antd';

import type { GeneratedQuestion } from '../../shared/types';
import generateQuestions from '../../shared/generateQuestions';

const Quizzer = (): JSX.Element => {
  const [generatedQuestions, setGeneratedQuestions] = React.useState<
    Array<GeneratedQuestion>
  >([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const changeToQuestion = (change: number) => (): void =>
    setCurrentIndex(currentIndex + change);

  React.useEffect((): void => setGeneratedQuestions(generateQuestions()), []);

  return generatedQuestions.length > 0 ? (
    <Card
      title={
        <Row align="middle" justify="space-between">
          <Col>
            <h2 style={{ marginBottom: '0px' }}>
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
  ) : (
    <h3>Loading Placeholder</h3>
  );
};

export default Quizzer;
