/* Botanical art, drawn in code (ported from the original script.js). Each function returns SVG inner markup. */
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function RN(x) { return function () { x = x * 16807 % 2147483647; return x / 2147483647; }; }

function rose(cx, cy, r, sd) {
  const q = RN(sd);
  let o = '<g transform="translate(' + cx + ' ' + cy + ')" filter="url(#sh)">';
  for (let k = 0; k < 3; k++) {
    const n = 5 - k, rr = r * (1 - k * .27);
    for (let i = 0; i < n; i++) {
      o += '<ellipse cy="' + (-rr * .45) + '" rx="' + rr * .62 + '" ry="' + rr * .58 + '" transform="rotate(' + (i * 360 / n + q() * 34 + k * 28) + ')" fill="url(#pt)" stroke="rgba(105,132,112,.5)" stroke-width="1"/>';
    }
  }
  return o + '<path d="M' + (-r * .1) + ' 0a' + r * .1 + ' ' + r * .1 + ' 0 1 1 ' + r * .2 + ' 0a' + r * .18 + ' ' + r * .18 + ' 0 1 1 ' + (-r * .3) + ' ' + r * .08 + '" fill="none" stroke="rgba(105,132,112,.6)" stroke-width="1.3"/></g>';
}

function leaf(x, y, l, a) {
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + a + ')" filter="url(#sh)"><path d="M0 0C' + l * .25 + ' ' + -l * .32 + ' ' + l * .75 + ' ' + -l * .26 + ' ' + l + ' 0C' + l * .75 + ' ' + l * .26 + ' ' + l * .25 + ' ' + l * .32 + ' 0 0Z" fill="url(#lf)" stroke="#3f6a4d" stroke-opacity=".5"/><path d="M0 0L' + l * .92 + ' 0" stroke="#3f6a4d" stroke-opacity=".45"/></g>';
}

export function flora() {
  let o = '<defs><radialGradient id="pt" cx=".5" cy=".75" r=".85"><stop offset="0" stop-color="#cfdccf"/><stop offset=".55" stop-color="#f3f7f2"/><stop offset="1" stop-color="#fff"/></radialGradient><linearGradient id="lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86ad89"/><stop offset="1" stop-color="#3f6e50"/></linearGradient><filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#143d2c" flood-opacity=".35"/></filter></defs>';
  [[20, 60, 60, 70], [96, 38, 50, 100], [150, 90, 44, 120], [230, 48, 58, 80], [300, 20, 50, 60], [330, 80, 56, 110], [395, 40, 48, 95], [180, 10, 46, 55], [60, 100, 40, 145], [270, 98, 42, 125]].forEach((v) => { o += leaf(v[0], v[1], v[2], v[3]); });
  [[28, 34, 52, 3], [132, 26, 56, 5], [236, 22, 60, 7], [342, 40, 56, 11], [-6, 96, 34, 13], [392, 102, 34, 17]].forEach((v) => { o += rose(v[0], v[1], v[2], v[3]); });
  [[70, 108, 34, 130], [190, 86, 36, 60], [300, 112, 34, 50]].forEach((v) => { o += leaf(v[0], v[1], v[2], v[3]); });
  return o;
}

export function gyp() {
  const q = RN(42);
  let o = "";
  function bl(x, y) {
    const r = 2 + q() * 1.8;
    o += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#fffdf6" stroke="rgba(120,100,60,.25)" stroke-width=".4"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r=".7" fill="#e6d49c"/>';
  }
  function br(x, y, a, l, d) {
    const x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l;
    o += '<path d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" stroke="#c9bc94" stroke-width="' + (d * .35).toFixed(2) + '" stroke-linecap="round"/>';
    if (d <= 1) { bl(x2, y2); return; }
    if (d <= 3) bl(x2, y2);
    br(x2, y2, a - .25 - q() * .4, l * .68, d - 1);
    br(x2, y2, a + .25 + q() * .4, l * .68, d - 1);
    if (q() > .5) br(x2, y2, a + (q() - .5) * .3, l * .6, d - 1);
  }
  for (let i = 0; i < 7; i++) br(75, 128, -Math.PI / 2 + (i - 3) * .2, 34 + q() * 14, 4);
  return o;
}

export function seal(initials) {
  const t = esc(initials);
  return '<defs>' +
    '<radialGradient id="wx" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#e8c496"/><stop offset=".5" stop-color="#bf8450"/><stop offset="1" stop-color="#7d4a26"/></radialGradient>' +
    '<filter id="wax" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="12" result="d"/><feGaussianBlur in="d" stdDeviation="1.2" result="b"/><feSpecularLighting in="b" surfaceScale="4" specularConstant=".9" specularExponent="24" lighting-color="#fff0d8" result="sp"><fePointLight x="40" y="20" z="110"/></feSpecularLighting><feComposite in="sp" in2="d" operator="in" result="sc"/><feComposite in="d" in2="sc" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter>' +
    '</defs>' +
    '<g filter="url(#wax)"><circle cx="80" cy="80" r="58" fill="url(#wx)"/><circle cx="34" cy="96" r="14" fill="url(#wx)"/><circle cx="124" cy="60" r="12" fill="url(#wx)"/><circle cx="104" cy="130" r="13" fill="url(#wx)"/><circle cx="50" cy="38" r="11" fill="url(#wx)"/></g>' +
    '<circle cx="80" cy="80" r="43" fill="none" stroke="#6e3f1f" stroke-opacity=".55" stroke-width="3"/><circle cx="80" cy="80" r="45.5" fill="none" stroke="#f3d3a8" stroke-opacity=".5" stroke-width="1.5"/>' +
    '<g font-family="Cormorant Garamond,serif" font-size="34" font-weight="600" text-anchor="middle">' +
    '<text x="81.5" y="92" fill="#f0cfa2" fill-opacity=".7">' + t + '</text>' +
    '<text x="78.5" y="90" fill="#5e3318" fill-opacity=".8">' + t + '</text>' +
    '<text x="80" y="91" fill="#b17a49">' + t + '</text></g>';
}
