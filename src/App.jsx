import { useEffect, useRef } from "react";
import { C } from "./config";
import { useReveal } from "./hooks";
import Envelope from "./components/Envelope";
import Hero from "./components/Hero";
import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";
import { Story, SaveTheDay, Venue, Timeline, Entourage, GoodToKnow, Gifts, Dress, Faq } from "./components/Sections";

export default function App() {
  const main = useRef(null);
  useReveal();

  useEffect(() => {
    document.title = C.name1 + " & " + C.name2 + " | Wedding Invitation";
  }, []);

  function onOpened() {
    document.body.classList.remove("lock");
    document.body.classList.add("in");
    window.scrollTo(0, 0);
    if (main.current) main.current.focus({ preventScroll: true });
  }

  return (
    <>
      <a className="skip" href="#main">Skip to invitation</a>
      <Envelope onOpened={onOpened} />

      <main className="card" id="main" tabIndex={-1} ref={main}>
        <Hero />
        <Story />
        <SaveTheDay />
        <Venue />
        <Timeline />
        <Entourage />
        <GoodToKnow />
        <Gifts />
        <Dress />
        <Faq />
        <Rsvp />
        <Footer />
      </main>

      <nav id="nav" aria-label="Sections">
        <a href="#top">Home</a><a href="#story">Story</a><a href="#venue">Venue</a><a href="#timeline">Program</a><a href="#rsvp">RSVP</a>
      </nav>
    </>
  );
}
