/* ===== EDIT YOUR DETAILS HERE ===== */
export const C = {
  name1: "Kristel Ann", name2: "Francis Jouvien",
  full1: "Kristel Ann A. Agunat", full2: "Francis Jouvien P. Corpuz", initials: "K&F",
  date: "2026-12-18T15:00:00+08:00", dateText: "Friday, December 18, 2026", hours: 3,
  story1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  story2: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
  /* mapQuery: what Google Maps should show (e.g. "Venue name, City"). Leave "" until the venue is final;
     the embedded map appears automatically once it is filled in. */
  ceremony: { name: "Ceremony venue name", addr: "Street, City", time: "3:00 PM", mapQuery: "" },
  reception: { name: "Reception venue name", addr: "Street, City", time: "6:00 PM", mapQuery: "" },
  timeline: [["3:00 PM", "Ceremony"], ["4:30 PM", "Cocktail hour"], ["6:00 PM", "Dinner"], ["8:00 PM", "First dance"], ["9:00 PM", "Cake and party"]],
  entourage: [["Parents of the Bride", ["Mother's name", "Father's name"]], ["Parents of the Groom", ["Mother's name", "Father's name"]], ["Principal Sponsors", ["Ninong / Ninang name", "Ninong / Ninang name"]], ["Maid of Honor", ["Name"]], ["Best Man", ["Name"]], ["Bridesmaids", ["Name", "Name", "Name"]], ["Groomsmen", ["Name", "Name", "Name"]]],
  info: [["Parking", "Add parking details here."], ["Where to stay", "Add nearby hotel suggestions here."], ["Weather", "Add a note about the expected weather and what to bring."]],
  gift: "Your presence is our greatest gift. If you wish to give more, you may use any of the options below.",
  pay: [["GCash", "0900 000 0000"], ["Bank transfer", "Bank name, 0000 0000 0000"]], giftUrl: "https://example.com",
  dress: "Formal attire", dressNote: "Please come in the colors below, so our day looks as soft as it feels.",
  colors: ["#ffffff", "#cdeee0", "#8fd1b0", "#4aa385", "#c9a66b"],
  faq: [["Can I bring a plus-one?", "Please check your invitation for the seats reserved in your name."], ["Are children welcome?", "Add your answer here."], ["What if I can't attend?", "Please let us know through the RSVP form below."], ["Can I take photos?", "Add your answer here."]],
  maxGuests: 4,
  rsvpBy: "November 28, 2026",
  /* Formspree: replies are emailed to the couple. Can be overridden with VITE_FORMSPREE_ENDPOINT. */
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mljdqyjv",
  hashtag: "#OurForeverStory"
};
/* =================================== */
