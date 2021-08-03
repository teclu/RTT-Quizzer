import React from "../../../_snowpack/pkg/react.js";
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Form,
  InputNumber,
  Menu,
  Row
} from "../../../_snowpack/pkg/antd.js";
import {GithubFilled, NumberOutlined} from "../../../_snowpack/pkg/@ant-design/icons.js";
import {
  PASSING_SCORE,
  PRESET_NUMBER_OF_QUESTIONS
} from "../../shared/constants.js";
import {Status} from "../../shared/enums.js";
import {totalQuestionCount} from "../../shared/questions.js";
import s from "../s.module.css.proxy.js";
const QuizzerSetup = ({
  settings,
  setSettings,
  setStatus
}) => {
  const isValidSettings = React.useMemo(() => settings.numberOfQuestions > 0, [settings]);
  const onSettingsChange = (key) => (value) => setSettings({...settings, [key]: value});
  const onSubmitClick = () => setStatus(Status.Quiz);
  return /* @__PURE__ */ React.createElement(Card, {
    title: /* @__PURE__ */ React.createElement(Row, {
      align: "middle",
      justify: "space-between"
    }, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement("h2", {
      className: s.title
    }, "RTT Quizzer")), /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(Button, {
      type: "default",
      size: "large",
      shape: "circle",
      icon: /* @__PURE__ */ React.createElement(GithubFilled, null),
      href: "https://github.com/teclu/RTT-Quizzer"
    }))),
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        type: "primary",
        size: "large",
        className: s.startRttQuizzer,
        disabled: !isValidSettings,
        onClick: onSubmitClick
      }, "Start RTT Quizzer")
    ]
  }, /* @__PURE__ */ React.createElement("h3", null, "Welcome to the RTT Quizzer!"), /* @__PURE__ */ React.createElement("p", null, "This is a simple quiz application for anyone who would like to prepare for the Riding Theory Test (RTT)."), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("p", null, "There are ", /* @__PURE__ */ React.createElement("b", null, totalQuestionCount), " text-only questions that can be attempted.")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("p", null, "All questions and answers were taken from", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://guidescroll.com/2020/03/singapore-class-2b-riding-theory-test-question-bank/"
  }, "GuideScroll 2B RTT Question Bank"), ".")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("p", null, "The minimum passing score is ", /* @__PURE__ */ React.createElement("b", null, PASSING_SCORE, "%"), "."))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement("h3", null, "Quizzer Setup"), /* @__PURE__ */ React.createElement(Form, {
    onFinish: onSubmitClick
  }, /* @__PURE__ */ React.createElement(Form.Item, {
    label: "Number of Questions"
  }, /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(InputNumber, {
    min: 1,
    max: totalQuestionCount,
    value: settings.numberOfQuestions,
    onChange: onSettingsChange("numberOfQuestions")
  })), /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(Dropdown, {
    overlay: /* @__PURE__ */ React.createElement(Menu, null, [...PRESET_NUMBER_OF_QUESTIONS, totalQuestionCount].map((numberOfQuestionsToSet, index) => /* @__PURE__ */ React.createElement(Menu.Item, {
      key: `option-${index}`,
      onClick: () => onSettingsChange("numberOfQuestions")(numberOfQuestionsToSet),
      style: {
        fontWeight: numberOfQuestionsToSet === settings.numberOfQuestions ? "bold" : void 0
      }
    }, numberOfQuestionsToSet, index === 2 && " (All)")))
  }, /* @__PURE__ */ React.createElement(Button, {
    type: "link",
    icon: /* @__PURE__ */ React.createElement(NumberOutlined, null)
  })))))));
};
export default QuizzerSetup;
