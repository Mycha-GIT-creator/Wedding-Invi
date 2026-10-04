import { C } from "./config";

export const RM = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const title = C.name1 + " & " + C.name2 + " - Wedding";

export const mapUrl = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
export const embedUrl = (q) => "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";

const t0 = new Date(C.date);
const t1 = new Date(t0.getTime() + C.hours * 36e5);
const z = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
export const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(title) +
  "&dates=" + z(t0) + "/" + z(t1) +
  "&location=" + encodeURIComponent(C.ceremony.name + ", " + C.ceremony.addr) +
  "&details=" + encodeURIComponent("Wedding of " + C.full1 + " and " + C.full2);

export async function copyText(txt) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(txt);
      return true;
    }
  } catch { /* fall through to legacy copy */ }
  const a = document.createElement("textarea");
  a.value = txt;
  a.style.cssText = "position:fixed;opacity:0";
  document.body.appendChild(a);
  a.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch { /* ignore */ }
  a.remove();
  return ok;
}
