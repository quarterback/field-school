import { useState } from "react";

/*
 * The East Detroit Card: one city-county card that works at the library, recreation
 * centers, RTD fare readers and school front offices.
 *
 * Privacy model (see CARD_PRIVACY.md):
 * - The card holds a number only. Each agency looks up its own records.
 * - A reader gets one yes or no answer, never the resident's file.
 * - Each place is set to automatic, ask me each time, or off by the resident.
 * - Every tap and every lookup is listed in Card activity.
 */

export type ConnectionMode = "auto" | "ask" | "off";
export type CardPlaceKey = "library" | "recreation" | "transit" | "school" | "age" | "water";
export type CardLogEntry = {
  id: string;
  date: string;
  time: string;
  who: string;
  where: string;
  kind: "Tap" | "Lookup" | "Request";
  learned: string;
  why: string;
  result: "Shared" | "Not shared" | "Waiting for you";
};
export type CardState = {
  status: "active" | "stopped";
  modes: Partial<Record<CardPlaceKey, ConnectionMode>>;
  log: CardLogEntry[];
};
type Place = {
  key: CardPlaceKey;
  name: string;
  who: string;
  use: string;
  learns: string;
  question: string;
  answer: string;
  answerDetail: string;
  tap: boolean;
};

export const CARD_PLACES: Place[] = [
  {
    key: "library", name: "Libraries", who: "Public Library District",
    use: "Borrow books, use computers and print at any branch.",
    learns: "Your library card is valid, and its number.",
    question: "Is this library card valid?", answer: "Library card valid", answerDetail: "Checkout can continue", tap: true,
  },
  {
    key: "recreation", name: "Recreation centers and pools", who: "Parks, Recreation and Cultural Affairs",
    use: "Enter with your resident pass.",
    learns: "Your resident pass is active.",
    question: "Is this resident pass active?", answer: "Resident pass active", answerDetail: "Entry allowed", tap: true,
  },
  {
    key: "transit", name: "RTD buses and trains", who: "Regional Transportation District (RTD)",
    use: "Pay your fare from your MyRide balance or pass.",
    learns: "A valid fare was paid. RTD keeps its own trip records under its own rules.",
    question: "Can this card pay a fare?", answer: "Fare paid", answerDetail: "Paid from MyRide", tap: true,
  },
  {
    key: "school", name: "School front offices", who: "Unified School District",
    use: "Sign in at your child's school as a parent or guardian.",
    learns: "You are a listed parent or guardian for a student at that school.",
    question: "Is this person a listed parent or guardian?", answer: "Listed parent or guardian", answerDetail: "Staff compare the card photo", tap: true,
  },
  {
    key: "age", name: "Senior and youth rates", who: "City and county facilities",
    use: "Get an age based rate without showing your birth date.",
    learns: "Whether you meet the age for the rate. Not your birth date.",
    question: "Does this person meet the age for the senior rate?", answer: "Meets age for senior rate", answerDetail: "Birth date not shared", tap: true,
  },
  {
    key: "water", name: "Water bill in your account", who: "Water and Sewer Authority",
    use: "See your water bill in My East Detroit.",
    learns: "That you signed in to My East Detroit, so it can show your bill.",
    question: "", answer: "", answerDetail: "", tap: false,
  },
];

const MODE_LABEL: Record<ConnectionMode, string> = { auto: "Automatic", ask: "Ask me each time", off: "Off" };

type Seed = { modes: Partial<Record<CardPlaceKey, ConnectionMode>>; log: CardLogEntry[] };
const SEEDS: Record<string, Seed> = {
  maya: {
    modes: { library: "auto", recreation: "auto", transit: "auto", school: "ask", age: "ask", water: "auto" },
    log: [
      { id: "C-M5", date: "2030-11-14", time: "4:12 PM", who: "Public Library District", where: "Watkins Public Library", kind: "Tap", learned: "Library card valid", why: "You checked out 2 items", result: "Shared" },
      { id: "C-M4", date: "2030-11-13", time: "7:48 AM", who: "Regional Transportation District (RTD)", where: "Route 15 bus", kind: "Tap", learned: "Fare paid", why: "You boarded a bus", result: "Shared" },
      { id: "C-M3", date: "2030-11-12", time: "8:05 PM", who: "Water and Sewer Authority", where: "My East Detroit", kind: "Lookup", learned: "You signed in", why: "You opened Water and sewer bills", result: "Shared" },
      { id: "C-M2", date: "2030-11-10", time: "3:02 PM", who: "Unified School District", where: "Prairie Crossing Elementary front office", kind: "Tap", learned: "Listed parent or guardian", why: "You picked up Jordan early. You approved this on your phone.", result: "Shared" },
      { id: "C-M1", date: "2030-11-09", time: "6:30 PM", who: "Parks, Recreation and Cultural Affairs", where: "Watkins Recreation Center", kind: "Tap", learned: "Resident pass active", why: "You entered the center", result: "Shared" },
    ],
  },
  avery: {
    modes: { library: "auto", transit: "auto", age: "off" },
    log: [
      { id: "C-A4", date: "2030-11-15", time: "11:20 PM", who: "Regional Transportation District (RTD)", where: "Central Station, Line E", kind: "Tap", learned: "Fare paid", why: "You entered the platform", result: "Shared" },
      { id: "C-A3", date: "2030-11-15", time: "2:40 PM", who: "Regional Transportation District (RTD)", where: "Route 6 bus", kind: "Tap", learned: "Fare paid", why: "You boarded a bus", result: "Shared" },
      { id: "C-A2", date: "2030-11-11", time: "5:55 PM", who: "Public Library District", where: "Watkins Junction Branch", kind: "Tap", learned: "Library card valid", why: "You used a computer", result: "Shared" },
      { id: "C-A1", date: "2030-11-08", time: "1:15 PM", who: "City and county facilities", where: "Central Station Community Center", kind: "Tap", learned: "Nothing", why: "Youth rate check. You turned age checks off.", result: "Not shared" },
    ],
  },
  helen: {
    modes: { library: "auto", recreation: "auto", age: "auto", water: "auto" },
    log: [
      { id: "C-H4", date: "2030-11-15", time: "9:02 AM", who: "City and county facilities", where: "Watkins Recreation Center pool", kind: "Tap", learned: "Meets age for senior rate", why: "Senior swim rate", result: "Shared" },
      { id: "C-H3", date: "2030-11-15", time: "9:02 AM", who: "Parks, Recreation and Cultural Affairs", where: "Watkins Recreation Center pool", kind: "Tap", learned: "Resident pass active", why: "You entered the pool", result: "Shared" },
      { id: "C-H2", date: "2030-11-12", time: "10:30 AM", who: "Water and Sewer Authority", where: "My East Detroit", kind: "Lookup", learned: "You signed in", why: "You opened Water and sewer bills", result: "Shared" },
      { id: "C-H1", date: "2030-11-07", time: "1:45 PM", who: "Public Library District", where: "Watkins Public Library", kind: "Tap", learned: "Library card valid", why: "You checked out 1 item", result: "Shared" },
    ],
  },
  samira: {
    modes: { library: "ask" },
    log: [
      { id: "C-S2", date: "2030-11-13", time: "9:10 AM", who: "Public Library District", where: "My East Detroit", kind: "Request", learned: "Nothing yet", why: "Offer an early literacy library card for Lucia. Answer on Family and children.", result: "Waiting for you" },
      { id: "C-S1", date: "2030-11-12", time: "4:30 PM", who: "State of Colorado Human Services", where: "Health First Colorado", kind: "Lookup", learned: "Lucia was added to your household", why: "Newborn health coverage", result: "Shared" },
    ],
  },
};

export function cardSeed(resident: string): CardState {
  const seed = SEEDS[resident] || { modes: { library: "ask" as ConnectionMode }, log: [] };
  return { status: "active", modes: { ...seed.modes }, log: seed.log.map(e => ({ ...e })) };
}

function placesFor(state: CardState) {
  return CARD_PLACES.filter(p => state.modes[p.key] !== undefined);
}

const fmt = (s: string) => new Date(s + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/* The physical card and the phone wallet version. One accessible description covers both. */
export function CardVisual({ name, number, expires, compact = false }: { name: string; number: string; expires: string; compact?: boolean }) {
  const initials = name.split(" ").map(p => p[0]).join("").slice(0, 2);
  const card = <div className="ed-card" aria-hidden="true">
    <span className="ed-card-shape" />
    <div className="ed-card-top"><span className="ed-card-seal">ED</span><span><strong>East Detroit Card</strong><small>City and County of East Detroit</small></span></div>
    <div className="ed-card-body">
      <span className="ed-card-photo">{initials}</span>
      <span className="ed-card-name"><strong>{name}</strong><small>Resident</small></span>
    </div>
    <div className="ed-card-foot"><span>Card ending {number}</span><span>Expires {expires}</span></div>
  </div>;
  return <div className={"ed-card-pair" + (compact ? " compact" : "")} role="img"
    aria-label={`East Detroit Card for ${name}, card ending ${number}, expires ${expires}. Shown as a plastic card and in a phone wallet.`}>
    {card}
    {!compact && <div className="ed-phone" aria-hidden="true">
      <div className="ed-phone-screen">
        <span className="ed-phone-label">Wallet</span>
        {card}
        <span className="ed-phone-hint">Hold near the reader</span>
      </div>
    </div>}
  </div>;
}

export function CardPage({ resident, state, number, issued, expires, tour, onMode, onStatus, onActivity, onReader }: {
  resident: string; state: CardState; number: string; issued: string; expires: string; tour: boolean;
  onMode: (key: CardPlaceKey, mode: ConnectionMode) => void; onStatus: (status: CardState["status"]) => void;
  onActivity: () => void; onReader: () => void;
}) {
  const places = placesFor(state);
  const stopped = state.status === "stopped";
  return <div className="card-page">
    <section className="card-hero" aria-labelledby="card-summary">
      <CardVisual name={resident} number={number} expires={expires} />
      <div className="card-summary">
        <h2 id="card-summary">{stopped ? "Your card is stopped" : "Your card is active"}</h2>
        <p>{stopped
          ? "No place can check this card until you turn it back on. Your records with each agency are not changed."
          : "Use the plastic card or the card in your phone's wallet. Each place gets only the answer it needs."}</p>
        <dl className="card-facts">
          <div><dt>Card number</dt><dd>Ends in {number}</dd></div>
          <div><dt>Issued</dt><dd>{issued}</dd></div>
          <div><dt>Expires</dt><dd>{expires}</dd></div>
          <div><dt>Issued by</dt><dd>County Clerk</dd></div>
        </dl>
        <div className="card-actions">
          {stopped
            ? <button type="button" className="program-submit" onClick={() => onStatus("active")}>Turn card back on</button>
            : <button type="button" className="secondary-submit" onClick={() => onStatus("stopped")}>Report lost or stolen card</button>}
          <button type="button" className="text-link" onClick={onActivity}>See card activity</button>
          {tour && <button type="button" className="text-link" onClick={onReader}>Try the card at a reader</button>}
        </div>
      </div>
    </section>

    <section className="section-block" aria-labelledby="card-places">
      <div className="section-heading"><h2 id="card-places">Where your card works</h2></div>
      <p className="agency-intro">Choose how each place can use your card. Automatic means the place gets its answer when you tap. Ask me each time means you approve on your phone first.</p>
      <div className="card-place-list">
        {places.map(p => <fieldset key={p.key} className="card-place">
          <legend><strong>{p.name}</strong><span>{p.who}</span></legend>
          <p>{p.use}</p>
          <p className="card-learns"><span>What it learns:</span> {p.learns}</p>
          <div className="mode-options">
            {(["auto", "ask", "off"] as ConnectionMode[]).map(mode => <label key={mode} className="mode-option">
              <input type="radio" name={"mode-" + p.key} value={mode} checked={state.modes[p.key] === mode} onChange={() => onMode(p.key, mode)} />
              <span>{MODE_LABEL[mode]}</span>
            </label>)}
          </div>
        </fieldset>)}
      </div>
      {places.length === 0 && <p className="empty-state">Your card is not connected to any services yet.</p>}
    </section>

    <section className="section-block card-never" aria-labelledby="card-never">
      <div className="section-heading"><h2 id="card-never">What your card never shares</h2></div>
      <ul>
        <li>Your address, birth date or other services. A place gets one answer, not your record.</li>
        <li>Copies of the documents you showed to get the card. Staff checked them and gave them back.</li>
        <li>Your immigration status. The card program never asks for it.</li>
      </ul>
    </section>
  </div>;
}

export function CardActivityPage({ state, onAsk }: { state: CardState; onAsk: (entry: CardLogEntry) => void }) {
  const [filter, setFilter] = useState("all");
  const agencies = Array.from(new Set(state.log.map(e => e.who)));
  const rows = filter === "all" ? state.log : state.log.filter(e => e.who === filter);
  return <div className="card-activity">
    <div className="filter-bar">
      <label htmlFor="activity-agency">Show</label>
      <select id="activity-agency" value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="all">All agencies</option>
        {agencies.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
    {rows.length ? <div className="table-scroll" role="region" aria-label="Card activity" tabIndex={0}>
      <table className="records-table">
        <thead><tr><th scope="col">When</th><th scope="col">Who checked</th><th scope="col">What they learned</th><th scope="col">Why</th><th scope="col">Result</th><th scope="col"><span className="visually-hidden">Action</span></th></tr></thead>
        <tbody>{rows.map(e => <tr key={e.id}>
          <td>{fmt(e.date)}<small>{e.time}</small></td>
          <td><strong>{e.who}</strong><small>{e.kind} · {e.where}</small></td>
          <td>{e.learned}</td>
          <td>{e.why}</td>
          <td><span className={"status " + (e.result === "Shared" ? "status-good" : e.result === "Not shared" ? "status-neutral" : "status-warn")}>{e.result}</span></td>
          <td className="action-cell"><button type="button" className="table-link" onClick={() => onAsk(e)}>Ask about this<span className="visually-hidden"> entry from {e.who} on {fmt(e.date)}</span></button></td>
        </tr>)}</tbody>
      </table>
    </div> : <p className="empty-state">No card activity yet.</p>}
  </div>;
}

/* Walkthrough only: tap the card at a reader and see what each side sees. */
export function CardReaderPage({ state, resident, libraryCard, onLog }: {
  state: CardState; resident: string; libraryCard: string; onLog: (entry: CardLogEntry) => void;
}) {
  const places = CARD_PLACES.filter(p => p.tap);
  const [placeKey, setPlaceKey] = useState<CardPlaceKey>(places.find(p => state.modes[p.key])?.key || "library");
  const [phase, setPhase] = useState<"idle" | "asking" | "done">("idle");
  const [outcome, setOutcome] = useState<{ ok: boolean; title: string; detail: string } | null>(null);
  const place = places.find(p => p.key === placeKey)!;
  const mode = state.modes[placeKey];
  const where: Record<string, string> = {
    library: "Watkins Public Library checkout desk", recreation: "Watkins Recreation Center entry gate",
    transit: "RTD Route 15 bus fare reader", school: "Prairie Crossing Elementary front office", age: "Watkins Recreation Center pool desk",
  };

  function finish(shared: boolean, reason: string) {
    const ok = shared;
    const detail = placeKey === "library" && ok ? `Account ${libraryCard}` : ok ? place.answerDetail : reason;
    setOutcome({ ok, title: ok ? place.answer : "No answer shared", detail });
    setPhase("done");
    const now = new Date();
    onLog({
      id: "C-" + now.getTime(), date: "2030-11-17", time: now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      who: place.who, where: where[placeKey], kind: "Tap", learned: ok ? place.answer : "Nothing", why: ok ? "You tapped your card" : reason, result: ok ? "Shared" : "Not shared",
    });
  }
  function tap() {
    if (state.status === "stopped") return finish(false, "Your card is stopped");
    if (!mode || mode === "off") return finish(false, mode === "off" ? "You turned this place off" : "Your card is not connected here");
    if (mode === "ask") { setPhase("asking"); setOutcome(null); return; }
    finish(true, "");
  }
  function choose(key: CardPlaceKey) { setPlaceKey(key); setPhase("idle"); setOutcome(null); }

  return <div className="reader-page">
    <fieldset className="reader-choose">
      <legend>Choose where to tap</legend>
      <div className="reader-choices">
        {places.map(p => <label key={p.key} className="mode-option">
          <input type="radio" name="reader-place" value={p.key} checked={placeKey === p.key} onChange={() => choose(p.key)} />
          <span>{where[p.key]}<small>{state.modes[p.key] ? MODE_LABEL[state.modes[p.key]!] : "Not connected"}</small></span>
        </label>)}
      </div>
    </fieldset>
    <div className="reader-stage">
      <section className="reader-device" aria-labelledby="reader-title">
        <h2 id="reader-title">What the reader shows</h2>
        <div className={"reader-screen" + (outcome ? (outcome.ok ? " ok" : " no") : "")} aria-live="polite">
          <span className="reader-where">{where[placeKey]}</span>
          {phase === "idle" && <><strong>Tap card or phone</strong><span>Waiting for a card</span></>}
          {phase === "asking" && <><strong>Waiting for approval</strong><span>The cardholder is answering on their phone</span></>}
          {phase === "done" && outcome && <>
            <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true">{outcome.ok
              ? <path d="M12 25 l8 8 l16 -18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              : <path d="M15 15 l18 18 M33 15 l-18 18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />}</svg>
            <strong>{outcome.title}</strong><span>{outcome.detail}</span></>}
        </div>
        <button type="button" className="program-submit reader-tap" onClick={tap} disabled={phase === "asking"}>Tap {resident.split(" ")[0]}'s card</button>
      </section>
      <section className="reader-phone-side" aria-labelledby="phone-title">
        <h2 id="phone-title">What {resident.split(" ")[0]}'s phone shows</h2>
        {phase === "asking" ? <div className="phone-prompt" role="alertdialog" aria-labelledby="prompt-q" aria-describedby="prompt-d">
          <p id="prompt-q"><strong>{place.who} is asking:</strong> {place.question}</p>
          <p id="prompt-d">They will get a yes or no answer. Nothing else is shared.</p>
          <div className="prompt-buttons">
            <button type="button" className="program-submit" autoFocus onClick={() => finish(true, "")}>Share</button>
            <button type="button" className="secondary-submit" onClick={() => finish(false, "You chose not to share")}>Don't share</button>
          </div>
        </div> : <p className="muted-small">{phase === "done" ? "Added to Card activity." : "Nothing to approve."}</p>}
        <h3>What this place does not receive</h3>
        <ul className="reader-not">
          <li>Name, address or birth date</li>
          <li>Records from any other agency</li>
          <li>Where else this card was used</li>
        </ul>
      </section>
    </div>
  </div>;
}
