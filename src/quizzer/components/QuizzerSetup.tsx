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
import { NumberOutlined } from '@ant-design/icons';

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
      title={<h2 className={s.title}>RTT Quizzer</h2>}
      actions={[
        <Button
          type="primary"
          className={s.startRttQuizzer}
          onClick={onSubmitClick}
        >
          Start RTT Quizzer
        </Button>,
      ]}
    >
      <h3>Welcome to the Riding Theory Test (RTT) Quizzer!</h3>
      <ul>
        <li>
          There are <b>{totalQuestionCount}</b> text-only questions that can be
          attempted.
        </li>
        <li>
          Questions were taken from{' '}
          <a href="https://guidescroll.com/2020/03/singapore-class-2b-riding-theory-test-question-bank/">
            GuideScroll 2B RTT Question Bank
          </a>
          .
        </li>
        <li>
          The passing score is <b>{PASSING_SCORE}%</b>.
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
