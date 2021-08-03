import React from "../../_snowpack/pkg/react.js";
import {Status} from "../shared/enums.js";
import generateQuestions from "../shared/generateQuestions.js";
import QuizzerSetup from "./components/QuizzerSetup.js";
import QuizzerTaker from "./components/QuizzerTaker.js";
const DEFAULT_SETTINGS = {
  numberOfQuestions: 70
};
const Quizzer = () => {
  const [generatedQuestions, setGeneratedQuestions] = React.useState([]);
  const [settings, setSettings] = React.useState(DEFAULT_SETTINGS);
  const [status, setStatus] = React.useState(Status.Setup);
  React.useEffect(() => {
    if (status === Status.Setup) {
      setGeneratedQuestions([]);
    } else if (status === Status.Quiz) {
      setGeneratedQuestions(generateQuestions(settings.numberOfQuestions));
    }
  }, [status]);
  if (status >= Status.Quiz && generatedQuestions.length > 0) {
    return /* @__PURE__ */ React.createElement(QuizzerTaker, {
      generatedQuestions,
      status,
      setStatus
    });
  }
  return /* @__PURE__ */ React.createElement(QuizzerSetup, {
    settings,
    setStatus,
    setSettings
  });
};
export default Quizzer;
