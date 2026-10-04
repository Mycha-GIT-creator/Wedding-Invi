import { useEffect, useRef, useState } from "react";
import { C } from "../config";
import { calendarUrl } from "../lib";

const FAIL = "We couldn't send your RSVP. Please check your connection and try again, or message the couple directly.";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [att, setAtt] = useState("");
  const [guests, setGuests] = useState(1);
  const [msg, setMsg] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null); // { text, yes }

  const fnRef = useRef(null);
  const emRef = useRef(null);
  const ynRef = useRef(null);
  const okRef = useRef(null);

  useEffect(() => { if (done && okRef.current) okRef.current.focus(); }, [done]);

  const yes = att.indexOf("Joy") === 0;
  const setG = (n) => setGuests(Math.min(C.maxGuests, Math.max(1, n)));

  function choose(v) {
    setAtt(v);
    setErrors((e) => ({ ...e, at: "" }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const nm = name.trim(), em = email.trim(), errs = {};
    if (nm.length < 2) errs.fn = "Please enter your full name.";
    if (em && !/^\S+@\S+\.\S+$/.test(em)) errs.em = "Please enter a valid email, or leave it blank.";
    if (!att) errs.at = "Please choose whether you can join us.";
    setErrors(errs);
    if (errs.fn) { fnRef.current.focus(); return; }
    if (errs.em) { emRef.current.focus(); return; }
    if (errs.at) { ynRef.current.querySelector("button").focus(); return; }

    if (!C.formEndpoint) { setErrors({ form: "RSVP isn't set up yet." }); return; }

    const d = {
      name: nm, email: em, attending: att, guests: yes ? guests : 0, message: msg,
      _subject: "RSVP from " + nm + ": " + att, _gotcha: gotcha,
    };
    setSending(true);
    try {
      const r = await fetch(C.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(d),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) {
        setDone({
          yes,
          text: "Thank you, " + nm + "! Your reply was sent to " + C.name1 +
            (yes ? ". We can't wait to celebrate with you." : ". We'll miss you."),
        });
      } else if (j.errors && j.errors.length) {
        setErrors({ form: j.errors.map((q) => q.message).join(" ") });
      } else {
        setErrors({ form: FAIL });
      }
    } catch {
      setErrors({ form: FAIL });
    } finally {
      setSending(false);
    }
  }

  return (
    <div id="rsvp"><section className="rv">
      <h2>RSVP</h2>
      <p>Kindly reply by {C.rsvpBy}.</p>

      {!done && (
        <form onSubmit={onSubmit} noValidate>
          <label htmlFor="fn">Full name</label>
          <input id="fn" ref={fnRef} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
            aria-describedby="e-fn" aria-invalid={errors.fn ? "true" : undefined} />
          <div className="er" id="e-fn" role="alert">{errors.fn}</div>

          <label htmlFor="em">Email <span style={{ opacity: .8 }}>(optional, so we can reach you)</span></label>
          <input id="em" ref={emRef} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
            aria-describedby="e-em" aria-invalid={errors.em ? "true" : undefined} />
          <div className="er" id="e-em" role="alert">{errors.em}</div>

          <input id="gotcha" name="_gotcha" value={gotcha} onChange={(e) => setGotcha(e.target.value)}
            tabIndex={-1} autoComplete="off" aria-hidden="true"
            style={{ position: "absolute", left: -9999, width: 1, height: 1 }} />

          <fieldset>
            <legend>Will you join us?</legend>
            <div className="yn" role="radiogroup" aria-label="Will you join us?" ref={ynRef}>
              <button type="button" role="radio" aria-checked={att === "Joyfully accepts"} onClick={() => choose("Joyfully accepts")}>Joyfully accept</button>
              <button type="button" role="radio" aria-checked={att === "Regretfully declines"} onClick={() => choose("Regretfully declines")}>Regretfully decline</button>
            </div>
            <div className="er" id="e-at" role="alert">{errors.at}</div>
          </fieldset>

          {yes && (
            <div id="yesOnly">
              <label htmlFor="gn">Number of guests</label>
              <div className="step">
                <button type="button" aria-label="Fewer guests" onClick={() => setG(guests - 1)}>&minus;</button>
                <output id="gn" aria-live="polite">{guests}</output>
                <button type="button" aria-label="More guests" onClick={() => setG(guests + 1)}>+</button>
              </div>
            </div>
          )}

          <label htmlFor="ms">Message for the couple</label>
          <textarea id="ms" rows="3" placeholder="Optional" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <div className="er" id="e-form" role="alert">{errors.form}</div>
          <button className="btn solid go" type="submit" disabled={sending}>{sending ? "Sending..." : "Send RSVP"}</button>
        </form>
      )}

      {done && (
        <div id="ok" ref={okRef} tabIndex={-1}>
          <h3>Thank you!</h3>
          <p>{done.text}</p>
          {done.yes && <a className="btn solid" href={calendarUrl} target="_blank" rel="noopener noreferrer">Save the date</a>}
        </div>
      )}
    </section></div>
  );
}
