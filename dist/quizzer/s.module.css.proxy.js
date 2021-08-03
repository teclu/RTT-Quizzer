
export let code = "._incorrectQuestionColumn_14qrm_1 {\n  max-width: 62.5% !important;\n}\n\n._incorrectQuestionsList_14qrm_5 {\n  margin-top: 8px;\n  max-height: 300px;\n  overflow-y: scroll;\n}\n\n._incorrectQuestionsRow_14qrm_11 {\n  width: 100%;\n}\n\n._jumpToQuestion_14qrm_15 {\n  margin-top: 4px;\n}\n\n._jumpToQuestionInput_14qrm_19 {\n  width: 45px !important;\n}\n\n._optionButton_14qrm_23 {\n  font-size: 20px !important;\n  height: auto !important;\n  min-height: 64px !important;\n  margin: 24px 0px;\n  padding: 24px !important;\n  text-align: left !important;\n  width: 100%;\n  white-space: normal !important;\n}\n\n._resultBreakdown_14qrm_34 {\n  margin-top: 32px;\n  font-size: 16px;\n}\n\n._resultCircle_14qrm_39 {\n  text-align: center;\n  width: 100%;\n}\n\n._startRttQuizzer_14qrm_44 {\n  width: 98.125%;\n}\n\n._stepButton_14qrm_48 {\n  width: 90%;\n}\n\n._title_14qrm_52 {\n  margin-bottom: 0px !important;\n}";
let json = {"incorrectQuestionColumn":"_incorrectQuestionColumn_14qrm_1","incorrectQuestionsList":"_incorrectQuestionsList_14qrm_5","incorrectQuestionsRow":"_incorrectQuestionsRow_14qrm_11","jumpToQuestion":"_jumpToQuestion_14qrm_15","jumpToQuestionInput":"_jumpToQuestionInput_14qrm_19","optionButton":"_optionButton_14qrm_23","resultBreakdown":"_resultBreakdown_14qrm_34","resultCircle":"_resultCircle_14qrm_39","startRttQuizzer":"_startRttQuizzer_14qrm_44","stepButton":"_stepButton_14qrm_48","title":"_title_14qrm_52"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}