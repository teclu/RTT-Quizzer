import React from "../../../_snowpack/pkg/react.js";
import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  List,
  Progress,
  Row,
  Space
} from "../../../_snowpack/pkg/antd.js";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  QuestionCircleTwoTone
} from "../../../_snowpack/pkg/@ant-design/icons.js";
import {PASSING_SCORE, UNANSWERED} from "../../shared/constants.js";
import {Colour, Status} from "../../shared/enums.js";
import s from "../s.module.css.proxy.js";
const QuizzerTaker = ({
  generatedQuestions,
  status,
  setStatus
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState(generatedQuestions.map(() => UNANSWERED));
  const incorrectQuestionIndices = React.useMemo(() => {
    const incorrectQuestionIndices2 = [];
    if (generatedQuestions.length > 0) {
      selectedOptions.forEach((selectedOption, index) => {
        if (selectedOption !== generatedQuestions[index].answerIndex) {
          incorrectQuestionIndices2.push(index);
        }
      });
    }
    return incorrectQuestionIndices2;
  }, [generatedQuestions, selectedOptions]);
  const scoreTotal = React.useMemo(() => generatedQuestions.length - incorrectQuestionIndices.length, [incorrectQuestionIndices]);
  const scorePercentage = React.useMemo(() => scoreTotal / generatedQuestions.length * 100, [scoreTotal]);
  const isPassingScore = React.useMemo(() => scorePercentage >= PASSING_SCORE, [scorePercentage]);
  const onSubmitAnswersClick = () => {
    setStatus(Status.Results);
    setCurrentIndex(-1);
  };
  const onReturnToResultsPageClick = () => setCurrentIndex(-1);
  const onReturnToLandingPageClick = () => setStatus(Status.Setup);
  const changeToQuestionIndex = (nextIndex) => {
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
  const onQuestionStepClick = (nextIndex) => () => changeToQuestionIndex(nextIndex);
  const onJumpToQuestionBlur = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      changeToQuestionIndex(value - 1);
    }
  };
  const onJumpToQuestionEnter = () => {
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.focus();
    document.body.removeChild(button);
  };
  const onOptionClick = (optionIndex) => () => {
    if (selectedOptions[currentIndex] !== optionIndex) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[currentIndex] = optionIndex;
      setSelectedOptions(newSelectedOptions);
    } else {
      changeToQuestionIndex(currentIndex + 1);
    }
  };
  const generateQuestionStatusIcon = (index) => /* @__PURE__ */ React.createElement(React.Fragment, null, status === Status.Results && generatedQuestions.length > 0 ? generatedQuestions[index].answerIndex === selectedOptions[index] ? /* @__PURE__ */ React.createElement(CheckCircleTwoTone, {
    twoToneColor: Colour.Green
  }, "Poop") : selectedOptions[index] !== UNANSWERED ? /* @__PURE__ */ React.createElement(CloseCircleTwoTone, {
    twoToneColor: Colour.Red
  }) : /* @__PURE__ */ React.createElement(QuestionCircleTwoTone, {
    twoToneColor: Colour.Orange
  }) : null);
  const incorrectQuestionList = () => {
    const listItems = [];
    for (const index of incorrectQuestionIndices) {
      listItems.push(/* @__PURE__ */ React.createElement(List.Item, {
        key: `incorrect-question-${index}`
      }, /* @__PURE__ */ React.createElement(Row, {
        align: "middle",
        justify: "space-between",
        className: s.incorrectQuestionsRow
      }, /* @__PURE__ */ React.createElement(Col, {
        className: s.incorrectQuestionColumn
      }, /* @__PURE__ */ React.createElement(Space, {
        size: "large"
      }, /* @__PURE__ */ React.createElement("span", null, index + 1, "."), /* @__PURE__ */ React.createElement("span", null, generatedQuestions[index].question))), /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(Space, null, /* @__PURE__ */ React.createElement("span", null, generateQuestionStatusIcon(index)), /* @__PURE__ */ React.createElement("a", {
        onClick: onQuestionStepClick(index)
      }, "View"))))));
    }
    return listItems;
  };
  if (currentIndex >= 0) {
    return /* @__PURE__ */ React.createElement(Card, {
      title: /* @__PURE__ */ React.createElement(Row, {
        align: "middle",
        justify: "space-between"
      }, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement("h2", {
        className: s.title
      }, /* @__PURE__ */ React.createElement(Space, null, "Question ", /* @__PURE__ */ React.createElement("b", null, currentIndex + 1), generateQuestionStatusIcon(currentIndex)))), status === Status.Results && /* @__PURE__ */ React.createElement(Button, {
        type: "primary",
        size: "large",
        onClick: onReturnToResultsPageClick
      }, "Results")),
      actions: [
        /* @__PURE__ */ React.createElement(Button, {
          type: "default",
          size: "large",
          className: s.stepButton,
          disabled: currentIndex === 0,
          onClick: onQuestionStepClick(currentIndex - 1)
        }, "Previous"),
        /* @__PURE__ */ React.createElement(Space, {
          size: "small",
          className: s.jumpToQuestion
        }, /* @__PURE__ */ React.createElement(InputNumber, {
          min: 1,
          max: generatedQuestions.length,
          className: s.jumpToQuestionInput,
          value: currentIndex + 1,
          onBlur: onJumpToQuestionBlur,
          onPressEnter: onJumpToQuestionEnter
        }), "/", /* @__PURE__ */ React.createElement("a", {
          onClick: onQuestionStepClick(generatedQuestions.length - 1)
        }, /* @__PURE__ */ React.createElement("b", null, generatedQuestions.length))),
        currentIndex < generatedQuestions.length - 1 || status === Status.Results ? /* @__PURE__ */ React.createElement(Button, {
          size: "large",
          type: status === Status.Quiz ? "primary" : "default",
          className: s.stepButton,
          disabled: currentIndex === generatedQuestions.length - 1,
          onClick: onQuestionStepClick(currentIndex + 1)
        }, "Next") : /* @__PURE__ */ React.createElement(Button, {
          type: "primary",
          size: "large",
          className: s.stepButton,
          onClick: onSubmitAnswersClick
        }, "Submit")
      ]
    }, /* @__PURE__ */ React.createElement("h1", null, generatedQuestions[currentIndex].question), generatedQuestions[currentIndex].options.map((option, index) => {
      const isAnswer = generatedQuestions[currentIndex].answerIndex === index;
      const isSelected = selectedOptions[currentIndex] === index;
      const isUserAnswerCorrect = isAnswer && isSelected;
      const isUserAnswerIncorrect = !isAnswer && isSelected;
      return /* @__PURE__ */ React.createElement(Button, {
        size: "large",
        className: s.optionButton,
        type: isSelected && status === Status.Quiz ? "primary" : "default",
        key: `option-${index}-${option.replaceAll(" ", "-")}`,
        onClick: status === Status.Quiz ? onOptionClick(index) : void 0,
        style: {
          background: status === Status.Results ? isUserAnswerCorrect ? Colour.Green : isUserAnswerIncorrect ? Colour.Red : isAnswer ? Colour.Green : void 0 : void 0,
          color: status === Status.Results && (isSelected || isAnswer) ? Colour.White : void 0,
          fontWeight: isSelected || status === Status.Results && isAnswer ? "bold" : void 0
        }
      }, /* @__PURE__ */ React.createElement(Space, {
        size: "large"
      }, /* @__PURE__ */ React.createElement("span", null, ["A", "B", "C"][index], "."), /* @__PURE__ */ React.createElement("span", null, option)));
    }));
  }
  return /* @__PURE__ */ React.createElement(Card, {
    title: /* @__PURE__ */ React.createElement("h2", {
      className: s.title
    }, "Results"),
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        type: "default",
        size: "large",
        className: s.stepButton,
        onClick: onReturnToLandingPageClick
      }, "Close"),
      /* @__PURE__ */ React.createElement(Button, {
        type: "primary",
        size: "large",
        className: s.stepButton,
        onClick: onQuestionStepClick(currentIndex + 1)
      }, "Review")
    ]
  }, /* @__PURE__ */ React.createElement(Progress, {
    type: "circle",
    width: 256,
    className: s.resultCircle,
    percent: scorePercentage,
    status: isPassingScore ? "success" : "exception",
    format: () => /* @__PURE__ */ React.createElement(React.Fragment, null, scorePercentage.toFixed(2), "%", /* @__PURE__ */ React.createElement("div", {
      className: s.resultBreakdown
    }, /* @__PURE__ */ React.createElement("h3", {
      style: {
        color: isPassingScore ? Colour.Green : Colour.Red
      }
    }, isPassingScore ? "PASS" : "FAIL"), /* @__PURE__ */ React.createElement("span", null, scoreTotal, " / ", generatedQuestions.length)))
  }), incorrectQuestionIndices.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement("h3", null, /* @__PURE__ */ React.createElement("b", null, incorrectQuestionIndices.length), " Incorrect Question", incorrectQuestionIndices.length > 1 && "s"), /* @__PURE__ */ React.createElement(List, {
    size: "large",
    className: s.incorrectQuestionsList,
    bordered: true
  }, incorrectQuestionList())));
};
export default QuizzerTaker;
