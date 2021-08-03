import React from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  List,
  Progress,
  Row,
  Space,
} from 'antd';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
} from '@ant-design/icons';

import type { GeneratedQuestion } from '../../shared/types';
import { PASSING_SCORE, UNANSWERED } from '../../shared/constants';
import { Colour, Status } from '../../shared/enums';

import s from '../s.module.scss';
import { SpaceContext } from 'antd/lib/space';

type QuizzerTakerProps = {
  generatedQuestions: Array<GeneratedQuestion>;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

const QuizzerTaker = ({
  generatedQuestions,
  status,
  setStatus,
}: QuizzerTakerProps): JSX.Element => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedOptions, setSelectedOptions] = React.useState<Array<number>>(
    [],
  );

  const incorrectQuestionIndices: Array<number> =
    React.useMemo((): Array<number> => {
      const incorrectQuestionIndices: Array<number> = [];
      selectedOptions.forEach((selectedOption: number, index: number): void => {
        if (selectedOption !== generatedQuestions[index].answerIndex) {
          incorrectQuestionIndices.push(index);
        }
      });
      return incorrectQuestionIndices;
    }, [selectedOptions]);

  const scoreTotal: number = React.useMemo(
    (): number => generatedQuestions.length - incorrectQuestionIndices.length,
    [incorrectQuestionIndices],
  );

  const scorePercentage: number = React.useMemo(
    (): number => (scoreTotal / generatedQuestions.length) * 100,
    [scoreTotal],
  );

  const isPassingScore: boolean = React.useMemo(
    (): boolean => scorePercentage >= PASSING_SCORE,
    [scorePercentage],
  );

  const onSubmitAnswersClick = (): void => {
    setStatus(Status.Results);
    setCurrentIndex(-1);
  };

  const onReturnToResultsPageClick = (): void => setCurrentIndex(-1);

  const onReturnToLandingPageClick = (): void => setStatus(Status.Setup);

  const changeToQuestionIndex = (nextIndex: number) => {
    switch (true) {
      case nextIndex > generatedQuestions.length - 1:
        setCurrentIndex(generatedQuestions.length - 1);
        break;
      case nextIndex < 0:
        setCurrentIndex(0);
        break;
      default:
        setCurrentIndex(nextIndex);
    }
  };

  const onQuestionStepClick = (nextIndex: number) => (): void =>
    changeToQuestionIndex(nextIndex);

  const onJumpToQuestionBlur = (
    event: React.FocusEvent<HTMLInputElement>,
  ): void => {
    const value: number = parseInt(event.target.value);
    if (!isNaN(value)) {
      changeToQuestionIndex(value - 1);
    }
  };

  const onJumpToQuestionEnter = (): void => {
    const button: HTMLButtonElement = document.createElement('button');
    document.body.appendChild(button);
    button.focus();
    document.body.removeChild(button);
  };

  const onOptionClick = (optionIndex: number) => (): void => {
    if (selectedOptions[currentIndex] !== optionIndex) {
      const newSelectedOptions: Array<number> = [...selectedOptions];
      newSelectedOptions[currentIndex] = optionIndex;
      setSelectedOptions(newSelectedOptions);
    } else {
      changeToQuestionIndex(currentIndex + 1);
    }
  };

  const generateQuestionStatusIcon = (index: number): JSX.Element | null =>
    status === Status.Results ? (
      generatedQuestions[index].answerIndex === selectedOptions[index] ? (
        <CheckCircleTwoTone twoToneColor={Colour.Green} />
      ) : selectedOptions[index] !== UNANSWERED ? (
        <CloseCircleTwoTone twoToneColor={Colour.Red} />
      ) : (
        <QuestionCircleTwoTone twoToneColor={Colour.Orange} />
      )
    ) : null;

  const incorrectQuestionList = (): Array<JSX.Element> => {
    const listItems: Array<JSX.Element> = [];
    for (const index of incorrectQuestionIndices) {
      listItems.push(
        <List.Item
          key={`incorrect-question-${index}`}
          actions={[
            <>{generateQuestionStatusIcon(index)}</>,
            <Button
              type="link"
              size="small"
              onClick={onQuestionStepClick(index)}
            >
              View Question
            </Button>,
          ]}
        >
          <Row gutter={16}>
            <Col>{index + 1}.</Col>
            <Col>{generatedQuestions[index].question}</Col>
          </Row>
        </List.Item>,
      );
    }
    return listItems;
  };

  React.useEffect(
    (): void =>
      setSelectedOptions(generatedQuestions.map((): number => UNANSWERED)),
    [],
  );

  if (currentIndex >= 0) {
    return (
      <Card
        title={
          <Row align="middle" justify="space-between">
            <Col>
              <h2 className={s.title}>
                <Space>
                  Question <b>{currentIndex + 1}</b>
                  {generateQuestionStatusIcon(currentIndex)}
                </Space>
              </h2>
            </Col>
            {status === Status.Results && (
              <Col>
                <Space>
                  <Button type="default" onClick={onReturnToLandingPageClick}>
                    Return Home
                  </Button>
                  <Button type="primary" onClick={onReturnToResultsPageClick}>
                    View Results
                  </Button>
                </Space>
              </Col>
            )}
          </Row>
        }
        actions={[
          <Button
            type="default"
            className={s.stepButton}
            disabled={currentIndex === 0}
            onClick={onQuestionStepClick(currentIndex - 1)}
          >
            Previous
          </Button>,
          <Space>
            <InputNumber
              min={1}
              max={generatedQuestions.length}
              className={s.jumpToQuestion}
              value={currentIndex + 1}
              onBlur={onJumpToQuestionBlur}
              onPressEnter={onJumpToQuestionEnter}
            />
            /
            <a onClick={onQuestionStepClick(generatedQuestions.length - 1)}>
              <b>{generatedQuestions.length}</b>
            </a>
          </Space>,
          currentIndex < generatedQuestions.length - 1 ||
          status === Status.Results ? (
            <Button
              type={status === Status.Quiz ? 'primary' : 'default'}
              className={s.stepButton}
              disabled={currentIndex === generatedQuestions.length - 1}
              onClick={onQuestionStepClick(currentIndex + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              className={s.stepButton}
              onClick={onSubmitAnswersClick}
            >
              Submit Answers
            </Button>
          ),
        ]}
      >
        <h1>{generatedQuestions[currentIndex].question}</h1>
        {generatedQuestions[currentIndex].options.map(
          (option: string, index: number): JSX.Element => {
            const isAnswer: boolean =
              generatedQuestions[currentIndex].answerIndex === index;
            const isSelected: boolean = selectedOptions[currentIndex] === index;
            const isUserAnswerCorrect: boolean = isAnswer && isSelected;
            const isUserAnswerIncorrect: boolean = !isAnswer && isSelected;
            return (
              <Button
                size="large"
                className={s.optionButton}
                type={
                  isSelected && status === Status.Quiz ? 'primary' : 'default'
                }
                key={`option-${index}-${option.replaceAll(' ', '-')}`}
                onClick={
                  status === Status.Quiz ? onOptionClick(index) : undefined
                }
                style={{
                  background:
                    status === Status.Results
                      ? isUserAnswerCorrect
                        ? Colour.Green
                        : isUserAnswerIncorrect
                        ? Colour.Red
                        : isAnswer
                        ? Colour.Green
                        : undefined
                      : undefined,
                  color:
                    status === Status.Results && (isSelected || isAnswer)
                      ? Colour.White
                      : undefined,
                  fontWeight:
                    isSelected || (status === Status.Results && isAnswer)
                      ? 'bold'
                      : undefined,
                }}
              >
                <Space size="large">
                  <span>{['A', 'B', 'C'][index]}.</span>
                  <span>{option}</span>
                </Space>
              </Button>
            );
          },
        )}
      </Card>
    );
  }
  return (
    <Card
      title={<h2 className={s.title}>Results</h2>}
      actions={[
        <Button
          type="default"
          className={s.stepButton}
          onClick={onReturnToLandingPageClick}
        >
          Return Home
        </Button>,
        <Button
          type="primary"
          className={s.stepButton}
          onClick={onQuestionStepClick(currentIndex + 1)}
        >
          Review Questions
        </Button>,
      ]}
    >
      <Progress
        type="circle"
        width={256}
        className={s.resultCircle}
        percent={scorePercentage}
        status={isPassingScore ? 'success' : 'exception'}
        format={(): JSX.Element => (
          <>
            {scorePercentage.toFixed(2)}%
            <div className={s.resultBreakdown}>
              <h3
                style={{
                  color: isPassingScore ? Colour.Green : Colour.Red,
                }}
              >
                {isPassingScore ? 'PASS' : 'FAIL'}
              </h3>
              <span>
                {scoreTotal} / {generatedQuestions.length}
              </span>
            </div>
          </>
        )}
      />
      {incorrectQuestionIndices.length > 0 && (
        <>
          <Divider />
          <h3>
            <b>{incorrectQuestionIndices.length}</b> Incorrect Questions
          </h3>
          <List className={s.incorrectQuestionsList} bordered={true}>
            {incorrectQuestionList()}
          </List>
        </>
      )}
    </Card>
  );
};

export default QuizzerTaker;
