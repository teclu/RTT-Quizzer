
export let code = "._layout_jwhnz_1 {\n  padding: 16px;\n}\n\nbody {\n  background: #f0f0f0 !important;\n}";
let json = {"layout":"_layout_jwhnz_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}