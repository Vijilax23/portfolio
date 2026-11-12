window.$ = (s, r = document) => r.querySelector(s);
window.esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
window.contactLinks = () => {
  const l = PORTFOLIO.links, out = [];
  if (l.email) out.push(["Email", "mailto:" + l.email]);
  if (l.linkedin) out.push(["LinkedIn", l.linkedin]);
  if (l.github) out.push(["GitHub", l.github]);
  return out;
};
