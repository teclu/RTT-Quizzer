import React from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Form,
  InputNumber,
  Menu,
  Row,
} from 'antd';
import { GithubFilled, NumberOutlined } from '@ant-design/icons';

import type { Settings } from '../../shared/types';
import {
  PASSING_SCORE,
  PRESET_NUMBER_OF_QUESTIONS,
} from '../../shared/constants';
import { Status } from '../../shared/enums';
import { totalQuestionCount } from '../../shared/questions';

import s from '../s.module.scss';

type QuizzerSetupProps = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

const QuizzerSetup = ({
  settings,
  setSettings,
  setStatus,
}: QuizzerSetupProps): JSX.Element => {
  const onSettingsChange =
    (key: string) =>
    (value?: string | number): void =>
      setSettings({ ...settings, [key]: value });

  const onSubmitClick = (): void => setStatus(Status.Quiz);

  return (
    <Card
      title={
        <Row align="middle" justify="space-between">
          <Col>
            <h2 className={s.title}>RTT Quizzer</h2>
          </Col>
          <Col>
            <Button
              type="default"
              size="large"
              shape="circle"
              icon={<GithubFilled />}
              href="https://github.com/teclu/RTT-Quizzer"
            />
          </Col>
        </Row>
      }
      actions={[
        <Button
          type="primary"
          size="large"
          className={s.startRttQuizzer}
          onClick={onSubmitClick}
        >
          Start RTT Quizzer
        </Button>,
      ]}
    >
      <h3>Welcome to the RTT Quizzer!</h3>
      <p>
        This is a simple quiz application for anyone who would like to prepare
        for the Riding Theory Test (RTT).
      </p>
      <ul>
        <li>
          <p>
            There are <b>{totalQuestionCount}</b> text-only questions that can
            be attempted.
          </p>
        </li>
        <li>
          <p>
            All questions and answers were taken from{' '}
            <a href="https://guidescroll.com/2020/03/singapore-class-2b-riding-theory-test-question-bank/">
              GuideScroll 2B RTT Question Bank
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            The minimum passing score is <b>{PASSING_SCORE}%</b>.
          </p>
        </li>
      </ul>
      <Divider />
      <h3>Quizzer Setup</h3>
      <Form onFinish={onSubmitClick}>
        <Form.Item label="Number of Questions">
          <Row>
            <Col>
              <InputNumber
                min={1}
                max={totalQuestionCount}
                value={settings.numberOfQuestions}
                onChange={onSettingsChange('numberOfQuestions')}
              />
            </Col>
            <Col>
              <Dropdown
                overlay={
                  <Menu>
                    {[...PRESET_NUMBER_OF_QUESTIONS, totalQuestionCount].map(
                      (
                        numberOfQuestionsToSet: number,
                        index: number,
                      ): JSX.Element => (
                        <Menu.Item
                          key={`option-${index}`}
                          onClick={(): void =>
                            onSettingsChange('numberOfQuestions')(
                              numberOfQuestionsToSet,
                            )
                          }
                          style={{
                            fontWeight:
                              numberOfQuestionsToSet ===
                              settings.numberOfQuestions
                                ? 'bold'
                                : undefined,
                          }}
                        >
                          {numberOfQuestionsToSet}
                          {index === 2 && ' (All)'}
                        </Menu.Item>
                      ),
                    )}
                  </Menu>
                }
              >
                <Button type="link" icon={<NumberOutlined />} />
              </Dropdown>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QuizzerSetup;
