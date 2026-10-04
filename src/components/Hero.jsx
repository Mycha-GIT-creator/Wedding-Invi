import { useEffect, useRef, useState } from "react";
import { C } from "../config";
import { flora } from "../art";
import { useFitNames } from "../hooks";

export default function Hero() {
  const h1 = useRef(null);
  const [floraHtml, setFloraHtml] = useState("");
  useFitNames(h1);

  // draw the flowers when the browser is idle, as in the original
  useEffect(() => {
    const run = () => setFloraHtml(flora());
    const id = (window.requestIdleCallback || setTimeout)(run);
    return () => (window.cancelIdleCallback || clearTimeout)(id);
  }, []);

  return (
    <section className="hero" id="top">
      <svg className="flora" id="flora" viewBox="0 0 390 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: floraHtml }} />
      <p className="script">We're getting married</p>
      <h1 ref={h1}><span>{C.name1}</span><span className="amp">&amp;</span><span>{C.name2}</span></h1>
      <p id="full" style={{ fontSize: ".9rem" }}>{C.full1} and {C.full2}</p>
      <div className="rule" />
      <div className="date-big">{C.dateText}</div>
    </section>
  );
}
