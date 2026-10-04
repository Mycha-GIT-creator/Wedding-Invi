import { C } from "../config";
import { useCountdown } from "../hooks";
import { calendarUrl, embedUrl, mapUrl } from "../lib";
import CopyButton from "./CopyButton";

export function Story() {
  return (
    <div className="alt" id="story"><section className="rv">
      <div className="mono">{C.initials}</div>
      <h2>Our story</h2>
      <p>{C.story1}</p><p>{C.story2}</p>
    </section></div>
  );
}

export function SaveTheDay() {
  const t = useCountdown(C.date);
  return (
    <section className="rv">
      <h2>Save the day</h2>
      <div className="date-big" style={{ fontSize: "1.6rem", margin: ".4rem 0" }}>{C.dateText}</div>
      <p>The countdown has begun</p>
      <div className="cd" role="timer" aria-label="Countdown to the wedding">
        <div><b>{t.d}</b><span>days</span></div>
        <div><b>{t.h}</b><span>hours</span></div>
        <div><b>{t.m}</b><span>minutes</span></div>
        <div><b>{t.s}</b><span>seconds</span></div>
      </div>
      <a className="btn solid" href={calendarUrl} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
    </section>
  );
}

function VenueBlock({ label, v }) {
  return (
    <>
      <p><b>{label}</b></p>
      <p>{v.name}<br />{v.addr}<br />{v.time}</p>
      {v.mapQuery && (
        <iframe
          className="map"
          title={`Map showing the ${label.toLowerCase()} venue`}
          src={embedUrl(v.mapQuery)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
      <a className="btn" href={mapUrl(v.mapQuery || v.name + " " + v.addr)} target="_blank" rel="noopener noreferrer">See location</a>
    </>
  );
}

export function Venue() {
  return (
    <div className="alt" id="venue"><section className="rv">
      <h2>How to get there</h2>
      <VenueBlock label="Ceremony" v={C.ceremony} />
      <div className="rule" />
      <VenueBlock label="Reception" v={C.reception} />
    </section></div>
  );
}

export function Timeline() {
  return (
    <section className="rv" id="timeline">
      <h2>Wedding timeline</h2>
      <ul className="tl">
        {C.timeline.map(([time, what]) => (
          <li key={time + what}><b>{time}</b><span>{what}</span></li>
        ))}
      </ul>
    </section>
  );
}

export function Entourage() {
  return (
    <div className="alt"><section className="rv">
      <h2>Our entourage</h2>
      <div className="ent">
        {C.entourage.map(([group, names]) => (
          <div key={group}>
            <h3>{group}</h3>
            {names.map((n, i) => <p key={i}>{n}</p>)}
          </div>
        ))}
      </div>
    </section></div>
  );
}

export function GoodToKnow() {
  return (
    <section className="rv">
      <h2>Good to know</h2>
      <div className="grid">
        {C.info.map(([k, v]) => <div key={k}><b>{k}</b><p>{v}</p></div>)}
      </div>
    </section>
  );
}

export function Gifts() {
  return (
    <div className="alt"><section className="rv">
      <h2>Gift guide</h2>
      <p>{C.gift}</p>
      <div className="pay">
        {C.pay.map(([k, v]) => (
          <div key={k}>
            <span><small>{k}</small>{v}</span>
            <CopyButton text={v} label={`Copy ${k} details`}>Copy</CopyButton>
          </div>
        ))}
      </div>
      <a className="btn" href={C.giftUrl} target="_blank" rel="noopener noreferrer">See gift list</a>
    </section></div>
  );
}

export function Dress() {
  return (
    <section className="rv">
      <h2>Dress code</h2>
      <p><b>{C.dress}</b></p><p>{C.dressNote}</p>
      <div className="sw" aria-hidden="true">
        {C.colors.map((c) => <i key={c} style={{ background: c }} />)}
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <div className="alt"><section className="rv">
      <h2>Questions</h2>
      <div>
        {C.faq.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section></div>
  );
}
