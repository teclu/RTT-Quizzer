import React from "../../_snowpack/pkg/react.js";
import Quizzer from "../quizzer/index.js";
import s from "./s.module.css.proxy.js";
const Container = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: s.layout
  }, /* @__PURE__ */ React.createElement(Quizzer, null));
};
export default Container;
