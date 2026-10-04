import { useState } from "react";
import { copyText } from "../lib";

export default function CopyButton({ text, label, className = "btn", children }) {
  const [done, setDone] = useState(false);
  async function onClick() {
    if (await copyText(text)) {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    }
  }
  return (
    <button className={className} type="button" aria-label={label} onClick={onClick}>
      {done ? "Copied" : children}
    </button>
  );
}
