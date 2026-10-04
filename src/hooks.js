import { useEffect, useLayoutEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

export function useCountdown(target) {
  const t0 = new Date(target).getTime();
  const calc = () => {
    const x = Math.max(0, t0 - Date.now());
    return {
      d: Math.floor(x / 864e5),
      h: pad(Math.floor((x % 864e5) / 36e5)),
      m: pad(Math.floor((x % 36e5) / 6e4)),
      s: pad(Math.floor((x % 6e4) / 1e3)),
    };
  };
  const [v, setV] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setV(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t0]);
  return v;
}

/* keep both names on one line at any width or font */
export function useFitNames(ref) {
  useLayoutEffect(() => {
    const h = ref.current;
    if (!h) return;
    const fit = () => {
      h.style.fontSize = "";
      const w = h.parentNode.clientWidth - 48;
      let s = parseFloat(getComputedStyle(h).fontSize);
      while (h.scrollWidth > w && s > 10) { s -= 0.5; h.style.fontSize = s + "px"; }
    };
    fit();
    addEventListener("resize", fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    return () => removeEventListener("resize", fit);
  }, [ref]);
}

/* scroll reveal + active menu item */
export function useReveal() {
  useEffect(() => {
    const rv = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) {
      rv.forEach((el) => el.classList.add("vis"));
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    rv.forEach((el) => io.observe(el));

    const links = document.querySelectorAll("#nav a");
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const el = document.querySelector(a.getAttribute("href")); if (el) so.observe(el); });

    return () => { io.disconnect(); so.disconnect(); };
  }, []);
}
