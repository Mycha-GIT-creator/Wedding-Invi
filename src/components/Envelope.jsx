import { useEffect, useMemo, useRef, useState } from "react";
import { C } from "../config";
import { RM } from "../lib";
import { gyp, seal } from "../art";

/* wax seal cracks, then the envelope slides open */
export default function Envelope({ onOpened }) {
  const [state, setState] = useState("closed"); // closed | crack | open
  const ref = useRef(null);
  const gypHtml = useMemo(gyp, []);
  const sealHtml = useMemo(() => seal(C.initials), []);

  useEffect(() => {
    if (ref.current) ref.current.inert = state === "open";
  }, [state]);

  function open() {
    if (state !== "closed") return;
    setState("crack");
    setTimeout(() => { setState("open"); onOpened(); }, RM ? 0 : 650);
  }

  const cls = state === "closed" ? "" : state === "crack" ? "crack" : "crack open";

  return (
    <div id="env" ref={ref} className={cls} role="dialog" aria-label="Open invitation" aria-hidden={state === "open"}>
      <div className="pb" />
      <div className="pl" />
      <div className="tie" aria-hidden="true">
        <div className="st" /><div className="st" />
        <svg id="gyp" viewBox="0 0 150 130" dangerouslySetInnerHTML={{ __html: gypHtml }} />
      </div>
      <button className="seal" id="openBtn" aria-label="Open the invitation" onClick={open}>
        <svg viewBox="0 0 160 160" dangerouslySetInnerHTML={{ __html: sealHtml }} />
      </button>
      <small>Tap the seal to open</small>
    </div>
  );
}
