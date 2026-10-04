import { useState } from "react";
import { C } from "../config";
import { copyText, title } from "../lib";

export default function Footer() {
  const [label, setLabel] = useState("Share this invitation");

  async function share() {
    const url = location.href;
    if (navigator.share) {
      navigator.share({ title, text: "You're invited to our wedding!", url }).catch(() => {});
    } else if (await copyText(url)) {
      setLabel("Copied");
      setTimeout(() => setLabel("Share this invitation"), 1600);
    }
  }

  return (
    <footer>
      <p className="script">{C.hashtag}</p>
      <button className="btn" id="share" type="button" onClick={share}>{label}</button>
    </footer>
  );
}
