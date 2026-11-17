import { useMemo, useState } from "react";

/*
 * Public benefit and service checker. No sign in, nothing saved or sent.
 * A visitor describes a household with facts that do not identify them, sees what
 * the household may be eligible for, then sees how the results change when one fact
 * changes. Rules use real Colorado and RTD limits with the 2026 HHS poverty
 * guidelines; sources are in BENEFIT_RULES.md. East Detroit city services are
 * part of the class scenario.
 */

export type Household = {
  size: number;
  income: number; // monthly, before taxes
  adults: boolean; // someone 19 to 64
  senior: boolean; // someone 65 or older
  under5: boolean;
  age4: boolean;
  schoolAge: boolean;
  pregnant: boolean; // pregnant, or a baby born in the last year
  disability: boolean;
  home: "rent" | "own";
  tenYears: boolean;
  transit: boolean;
  foodBusiness: boolean;
};

type Group = "auto" | "apply";
type Result = { id: string; name: string; who: string; group: Group; why: string; how: string; limit?: number };

const FPL_BASE = 15960;
const FPL_STEP = 5680;
export const fpl = (n: number) => FPL_BASE + FPL_STEP * (Math.max(1, n) - 1);
const monthlyLimit = (n: number, pct: number) => Math.round((fpl(n) * pct) / 100 / 12);
const money = (n: number) => "$" + n.toLocaleString("en-US");

export function evaluate(h: Household): Result[] {
  const pct = ((h.income * 12) / fpl(h.size)) * 100;
  const kids = h.under5 || h.age4 || h.schoolAge;
  const youth = kids;
  const out: Result[] = [];
  const add = (r: Result) => out.push(r);

  // Health coverage (Health First Colorado and CHP+)
  const adultMedicaid = h.adults && pct <= 138;
  if (adultMedicaid) add({ id: "hfc-adult", name: "Health First Colorado for adults", who: "State of Colorado", group: "apply", why: "Adults 19 to 64 with income at or below 138% of the poverty level.", how: "Apply on PEAK or at County Human Services.", limit: monthlyLimit(h.size, 138) });
  const kidMedicaid = kids && pct <= 142;
  if (kidMedicaid) add({ id: "hfc-kids", name: "Health First Colorado for children", who: "State of Colorado", group: "apply", why: "Children 18 and under with household income at or below 142% of the poverty level.", how: "Apply on PEAK or at County Human Services.", limit: monthlyLimit(h.size, 142) });
  else if (kids && pct <= 260) add({ id: "chp-kids", name: "Child Health Plan Plus (CHP+) for children", who: "State of Colorado", group: "apply", why: "Children whose household earns too much for Health First Colorado, up to 260% of the poverty level.", how: "Apply on PEAK or at County Human Services.", limit: monthlyLimit(h.size, 260) });
  const pregMedicaid = h.pregnant && pct <= 195;
  if (pregMedicaid) add({ id: "hfc-preg", name: "Health First Colorado during pregnancy", who: "State of Colorado", group: "apply", why: "Pregnant people with household income at or below 195% of the poverty level.", how: "Apply on PEAK or at County Human Services.", limit: monthlyLimit(h.size, 195) });
  else if (h.pregnant && pct <= 260) add({ id: "chp-preg", name: "CHP+ prenatal coverage", who: "State of Colorado", group: "apply", why: "Pregnant people up to 260% of the poverty level who earn too much for Health First Colorado.", how: "Apply on PEAK or at County Human Services.", limit: monthlyLimit(h.size, 260) });
  if (h.pregnant && pregMedicaid) add({ id: "newborn", name: "Newborn coverage added after the birth", who: "State of Colorado and County Clerk", group: "auto", why: "When the birth is registered, a baby born to a parent on Health First Colorado can be added to the parent's case without a new application.", how: "Happens after the birth is reported. In My East Detroit you see the update." });

  // Food
  const snap = pct <= 200;
  if (snap) add({ id: "snap", name: "SNAP food assistance", who: "County Human Services", group: "apply", why: "Colorado households with gross income at or below 200% of the poverty level. A net income test also applies.", how: "Apply on PEAK or at County Human Services.", limit: monthlyLimit(h.size, 200) });
  if ((h.pregnant || h.under5) && (pct <= 185 || adultMedicaid || kidMedicaid || pregMedicaid || snap)) add({ id: "wic", name: "WIC", who: "County Human Services", group: "apply", why: "Pregnant people, new parents and children under 5 at or below 185% of the poverty level. Being on Health First Colorado or SNAP counts as proof of income.", how: "Contact a WIC clinic. WIC does its own nutrition check.", limit: monthlyLimit(h.size, 185) });
  if (h.schoolAge) add({ id: "meals", name: "Free school breakfast and lunch", who: "Unified School District", group: "auto", why: "Colorado's Healthy School Meals for All pays for meals for every student at participating districts, at any income.", how: "No application. Your child eats at school." });
  if (h.age4) add({ id: "upk", name: "Colorado Universal Preschool", who: "State of Colorado", group: "apply", why: "Free preschool hours for every child in the year before kindergarten, at any income.", how: "Apply through the state's universal preschool portal." });

  // Transit
  if (h.transit && youth) add({ id: "rtd-youth", name: "Free RTD rides for youth 19 and under", who: "Regional Transportation District (RTD)", group: "auto", why: "Zero Fare for Youth: young people ride all RTD service at no cost.", how: "Show a school ID or other proof of age. The East Detroit Card's age check works too." });
  if (h.transit && h.senior) add({ id: "rtd-senior", name: "Half price RTD fares for people 65 and older", who: "Regional Transportation District (RTD)", group: "auto", why: "RTD's senior discount is 50%. A government ID with your birth date is enough.", how: "Show your ID. No application needed." });
  if (h.transit && h.disability) add({ id: "rtd-disability", name: "Half price RTD fares for people with disabilities", who: "Regional Transportation District (RTD)", group: "apply", why: "RTD's disability discount is 50%.", how: "Show a Medicare card or apply for an RTD Special Discount Card." });
  if (h.transit && h.adults && pct <= 250) add({ id: "rtd-live", name: "LiVE half price fares", who: "Regional Transportation District (RTD)", group: "apply", why: "RTD's income-based discount for riders 20 to 64 at or below 250% of the poverty level.", how: "Apply on PEAK. Health First Colorado or SNAP can show you already qualify.", limit: monthlyLimit(h.size, 250) });

  // Home
  if (h.senior && h.home === "own" && h.tenYears) add({ id: "senior-tax", name: "Senior property tax exemption", who: "County Assessor", group: "apply", why: "Owners 65 or older who have owned and lived in the home 10 years: half of the first $200,000 of value is exempt. No income limit.", how: "Apply to the County Assessor by July 15." });
  if (h.home === "rent") add({ id: "housing", name: "Rent help from the City Housing Division", who: "City Housing Division", group: "apply", why: "The Housing Division runs local rent assistance and decides who qualifies.", how: "Apply in My East Detroit under Housing assistance." });

  // East Detroit city and county services
  add({ id: "library", name: "Library card", who: "Public Library District", group: "auto", why: "Every East Detroit resident can borrow from the library.", how: "With the East Detroit Card, your card is your library card." });
  if (h.foodBusiness) add({ id: "food", name: "Food license renewal without a new application", who: "Public Health and Finance", group: "auto", why: "When your inspection is clear and your fee is paid, the license can renew on its own.", how: "Turn on automatic renewal in My East Detroit." });
  return out;
}

type Change = { label: string; apply: (h: Household) => Household; when?: (h: Household) => boolean };
const CHANGES: Change[] = [
  { label: "If your income were $1,000 a month lower", apply: h => ({ ...h, income: Math.max(0, h.income - 1000) }), when: h => h.income > 0 },
  { label: "If your income were $500 a month lower", apply: h => ({ ...h, income: Math.max(0, h.income - 500) }), when: h => h.income > 0 },
  { label: "If your income were $500 a month higher", apply: h => ({ ...h, income: h.income + 500 }) },
  { label: "If you had a baby", apply: h => ({ ...h, size: Math.min(8, h.size + 1), pregnant: true, under5: true }), when: h => !h.pregnant },
  { label: "If someone in the household turned 65", apply: h => ({ ...h, senior: true }), when: h => !h.senior },
  { label: "If a child started school", apply: h => ({ ...h, schoolAge: true }), when: h => !h.schoolAge },
  { label: "If you started riding RTD", apply: h => ({ ...h, transit: true }), when: h => !h.transit },
  { label: "If you rented instead of owning", apply: h => ({ ...h, home: "rent" }), when: h => h.home === "own" },
];

const START: Household = { size: 3, income: 3800, adults: true, senior: false, under5: true, age4: false, schoolAge: true, pregnant: false, disability: false, home: "rent", tenYears: false, transit: true, foodBusiness: false };

export function BenefitChecker() {
  const [h, setH] = useState<Household>(START);
  const set = <K extends keyof Household>(k: K, v: Household[K]) => setH(prev => ({ ...prev, [k]: v }));
  const results = useMemo(() => evaluate(h), [h]);
  const pct = Math.round(((h.income * 12) / fpl(h.size)) * 100);
  const auto = results.filter(r => r.group === "auto");
  const apply = results.filter(r => r.group === "apply");
  const ids = new Set(results.map(r => r.id));
  const changes = CHANGES.filter(c => !c.when || c.when(h)).map(c => {
    const next = evaluate(c.apply(h));
    const nextIds = new Set(next.map(r => r.id));
    return {
      label: c.label,
      gained: next.filter(r => !ids.has(r.id)).map(r => r.name),
      lost: results.filter(r => !nextIds.has(r.id)).map(r => r.name),
    };
  });
  const box = (k: keyof Household, label: string) => <label className="check-option">
    <input type="checkbox" checked={h[k] as boolean} onChange={e => set(k, e.target.checked as never)} />
    <span>{label}</span>
  </label>;

  return <div className="checker">
    <form className="checker-form" onSubmit={e => e.preventDefault()} aria-describedby="checker-privacy">
      <p id="checker-privacy" className="checker-privacy">You don't need to sign in. Nothing you enter is saved or sent. It stays on this page.</p>
      <div className="checker-row">
        <div className="form-field">
          <label htmlFor="ck-size">People in your household</label>
          <select id="ck-size" value={h.size} onChange={e => set("size", Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="ck-income">Household income per month, before taxes</label>
          <div className="income-input"><span aria-hidden="true">$</span>
            <input id="ck-income" type="number" inputMode="numeric" min={0} step={50} value={h.income}
              onChange={e => set("income", Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="ck-income-range">Slide to try a different income</label>
        <input id="ck-income-range" type="range" min={0} max={12000} step={50} value={Math.min(h.income, 12000)}
          aria-valuetext={`${money(h.income)} a month`} onChange={e => set("income", Number(e.target.value))} />
        <p className="field-help">{money(h.income)} a month is about {pct}% of the federal poverty level for {h.size} {h.size === 1 ? "person" : "people"}.</p>
      </div>
      <fieldset className="checker-set">
        <legend>Who lives with you?</legend>
        <div className="check-grid">
          {box("adults", "Adults 19 to 64")}
          {box("senior", "Someone 65 or older")}
          {box("pregnant", "Someone pregnant, or a baby born this year")}
          {box("under5", "Children under 5")}
          {box("age4", "A child starting preschool next fall")}
          {box("schoolAge", "Children in school, 5 to 18")}
          {box("disability", "Someone with a disability")}
        </div>
      </fieldset>
      <fieldset className="checker-set">
        <legend>Home and getting around</legend>
        <div className="check-grid">
          <label className="check-option"><input type="radio" name="ck-home" checked={h.home === "rent"} onChange={() => set("home", "rent")} /><span>We rent</span></label>
          <label className="check-option"><input type="radio" name="ck-home" checked={h.home === "own"} onChange={() => set("home", "own")} /><span>We own our home</span></label>
          {h.home === "own" && box("tenYears", "We have owned and lived here 10 years or more")}
          {box("transit", "Someone rides RTD buses or trains")}
          {box("foodBusiness", "We run a food business")}
        </div>
      </fieldset>
    </form>

    <div className="checker-results">
      <p className="checker-summary" aria-live="polite"><strong>{results.length} services and benefits</strong> may fit this household. {auto.length} happen without an application.</p>
      <section aria-labelledby="ck-auto">
        <h3 id="ck-auto">Happens without an application</h3>
        <ul className="result-list">{auto.map(r => <li key={r.id}>
          <strong>{r.name}</strong><span className="result-who">{r.who}</span>
          <p>{r.why}</p><p className="result-how">{r.how}</p>
        </li>)}</ul>
      </section>
      <section aria-labelledby="ck-apply">
        <h3 id="ck-apply">You apply, and the agency decides</h3>
        {apply.length ? <ul className="result-list">{apply.map(r => <li key={r.id}>
          <strong>{r.name}</strong><span className="result-who">{r.who}</span>
          <p>{r.why}{r.limit ? <> Limit for {h.size} {h.size === 1 ? "person" : "people"}: <b>{money(r.limit)} a month</b>.</> : null}</p>
          <p className="result-how">{r.how}</p>
        </li>)}</ul> : <p className="muted-small">Nothing that needs an application matches these answers.</p>}
      </section>
      <section aria-labelledby="ck-change" className="checker-changes">
        <h3 id="ck-change">What would change</h3>
        <p>Each line changes one answer and keeps the rest.</p>
        <ul>{changes.map(c => <li key={c.label}>
          <strong>{c.label}</strong>
          {c.gained.length || c.lost.length ? <span>
            {c.gained.length > 0 && <span className="gain">Adds {c.gained.join(", ")}.</span>}
            {c.lost.length > 0 && <span className="loss">Removes {c.lost.join(", ")}.</span>}
          </span> : <span className="same">No change.</span>}
        </li>)}</ul>
      </section>
      <p className="checker-note">These are estimates from published income limits. Each agency checks your full situation and makes the decision. Income limits use the 2026 federal poverty guidelines.</p>
    </div>
  </div>;
}
