import { useState } from "react";
import type { FormEvent } from "react";
import { DEMO_RESIDENTS } from "./DemoResidents";
import { CardVisual } from "./CityCard";
import { BenefitChecker } from "./BenefitChecker";

type EntryProps = { onSignIn:()=>void; onCard?:()=>void };

const POPULAR_SERVICES=[
  {task:"Report a street problem",owner:"Transportation and Public Works"},
  {task:"Ask about a water bill",owner:"Water and Sewer Authority"},
  {task:"Renew a library loan",owner:"Public Library District"},
  {task:"Book a recreation facility",owner:"Parks, Recreation and Cultural Affairs"},
  {task:"Renew a food establishment license",owner:"Public Health and Finance"},
  {task:"Check a housing application",owner:"City Housing Division"},
  {task:"Get an enrollment verification letter",owner:"Unified School District"},
  {task:"See your MyRide card",owner:"Regional Transportation District (RTD)"},
];

const BIRTH_STEPS=[
  {what:"Birth is registered",who:"County Clerk and State Vital Records record the child's name, birth date and parent. No medical records come to the city."},
  {what:"Newborn health coverage is checked",who:"The State of Colorado adds the baby to a parent's Health First Colorado case when the parent already has coverage."},
  {what:"WIC information appears",who:"County Human Services shows how to contact WIC. WIC still decides who can enroll."},
  {what:"An early literacy library card is offered",who:"The Public Library District offers a card. The family chooses whether to accept it."},
];

const PARTNER_AGENCIES=[
  {name:"Regional Transportation District (RTD)",what:"MyRide card and fare products"},
  {name:"Public Library District",what:"Library card and loans"},
  {name:"Water and Sewer Authority",what:"Bills and billing questions"},
  {name:"Unified School District",what:"Student enrollment for parents and guardians"},
  {name:"Regional Housing Authority",what:"Housing inquiries"},
];

export function PublicWelcome({onSignIn,onCard}:EntryProps){
  const [query,setQuery]=useState("");
  const [submitted,setSubmitted]=useState("");
  const term=submitted.trim().toLowerCase();
  const services=term?POPULAR_SERVICES.filter(s=>(s.task+" "+s.owner).toLowerCase().includes(term)):POPULAR_SERVICES;
  function search(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setSubmitted(query);
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target=document.getElementById("public-services");
    target?.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
    target?.focus({preventScroll:true});
  }
  return <div className="public-home">
    <section className="home-hero" aria-labelledby="public-title">
      <img className="home-hero-image" src="/assets/civic-square-2030.jpg" alt="Civic Square at sunset, with the Front Range on the horizon" />
      <div className="home-container">
        <div className="home-hero-panel">
          <h1 id="public-title">Get city and county services in one place</h1>
          <p>Check your permits, bills, service requests and notices. You can also see records from the library, school district and other public agencies.</p>
          <form role="search" className="home-search" onSubmit={search}>
            <label htmlFor="home-search-input">What do you need to do?</label>
            <div className="home-search-row">
              <input id="home-search-input" type="search" placeholder="For example: water bill" value={query}
                onChange={event=>{setQuery(event.target.value);if(!event.target.value)setSubmitted("");}} />
              <button type="submit">Search</button>
            </div>
          </form>
          <p className="home-signin-line">Already have an account? <button type="button" className="home-inline-link" onClick={onSignIn}>Sign in to My East Detroit</button></p>
        </div>
      </div>
    </section>

    <section id="public-checker" className="home-container home-checker" aria-labelledby="public-checker-title">
      <h2 id="public-checker-title">See what your household may get</h2>
      <p className="home-section-lede">Answer a few questions about your household. Then change one answer at a time to see what would be different.</p>
      <BenefitChecker />
    </section>

    <section id="public-services" className="home-container home-services" aria-labelledby="public-services-title" tabIndex={-1}>
      <h2 id="public-services-title">{term?"Services that match your search":"Popular services"}</h2>
      <p className="home-section-lede" aria-live="polite">{term
        ?(services.length?`Showing services that match \u201c${submitted.trim()}\u201d. Sign in to use a service.`:`No popular service matches \u201c${submitted.trim()}\u201d. Sign in to see every service.`)
        :"Each service shows the office that handles it. Sign in to use a service."}</p>
      <ul className="home-service-list">
        {services.map(s=><li key={s.task}>
          <button type="button" onClick={onSignIn}><strong>{s.task}</strong><span>{s.owner}</span></button>
        </li>)}
      </ul>
      <p><button type="button" className="home-inline-link home-all-services" onClick={onSignIn}>See all services</button></p>
    </section>

    <section className="home-container home-updates" aria-labelledby="public-updates-title">
      <div className="home-updates-copy">
        <h2 id="public-updates-title">Some updates need no new form</h2>
        <p>When an agency already has the information it needs, it can make some updates for you. Sign in to see what changed and whether you need to do anything.</p>
        <h3>Food establishment licenses</h3>
        <p>Your license can renew on its own when Public Health clears your inspection, Finance has your fee and you have turned on automatic renewal. If an inspection finds a problem, Public Health reviews the renewal with you.</p>
      </div>
      <div className="home-birth">
        <h3>When a child is born</h3>
        <p>After the birth is registered, these updates can reach the family's account without another birth form.</p>
        <ol>
          {BIRTH_STEPS.map((step,index)=><li key={step.what}>
            <span className="home-step-number" aria-hidden="true">{index+1}</span>
            <div><strong>{step.what}</strong><span>{step.who}</span></div>
          </li>)}
        </ol>
        <p className="home-birth-note">Each agency still makes its own decision. Every update shows which records were used and which office sent it.</p>
      </div>
    </section>

    <section id="public-card" className="home-container home-card" aria-labelledby="public-card-title">
      <div className="home-card-copy">
        <h2 id="public-card-title">One card for the library, recreation centers and RTD</h2>
        <p>The East Detroit Card is a photo ID from the city and county. Tap it at the library, a recreation center or an RTD fare reader. Each place gets one answer, such as "pass active."</p>
        <p><button type="button" className="home-inline-link" onClick={onCard}>About the East Detroit Card</button></p>
      </div>
      <CardVisual name="Alex Morales" number="2030" expires="Nov 2035" />
    </section>

    <section id="public-agencies" className="home-agencies" aria-labelledby="public-agencies-title">
      <div className="home-container home-agencies-inner">
        <img src="/assets/central-station-2030.jpg" alt="Riders waiting for a light rail train at Central Station in the evening" />
        <div className="home-agencies-copy">
          <h2 id="public-agencies-title">Your transit card, library loans and water bill in one account</h2>
          <p>Some public agencies outside city government show your records here too.</p>
          <ul>
            {PARTNER_AGENCIES.map(a=><li key={a.name}><strong>{a.name}</strong><span>{a.what}</span></li>)}
          </ul>
          <p>Each agency keeps its own records and makes its own decisions. Using My East Detroit does not give every agency access to your information.</p>
        </div>
      </div>
    </section>

    <section id="public-help" className="home-help" aria-labelledby="public-help-title">
      <img src="/assets/box-elder-greenway-2030.jpg" alt="A trail crossing the Box Elder Creek greenway, with new homes and the mountains behind" />
      <div className="home-container home-help-inner">
        <div className="home-help-panel">
          <h2 id="public-help-title">Need help with your account?</h2>
          <p>Call 311. Staff can help you sign in, find a record or reach the right office.</p>
        </div>
      </div>
    </section>
  </div>;
}

export function PublicSignIn({onContinue,onBack,initialEmail}:{
  onContinue:(key:string)=>void;
  onBack:()=>void;
  initialEmail:string;
}){
  const [email,setEmail]=useState(initialEmail);
  const [error,setError]=useState("");
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const person=DEMO_RESIDENTS.find(p=>p.account.email.toLowerCase()===email.trim().toLowerCase());
    if(!person){
      setError("We could not find that account. Choose an email address from the list on this page.");
      return;
    }
    setError("");
    onContinue(person.key);
  }
  return <div className="public-login">
    <button type="button" className="back-link" onClick={onBack}>Back to My East Detroit</button>
    <div className="public-login-layout">
      <div className="public-login-form">
        <h1>Sign in to My East Detroit</h1>
        <p>Choose an account to see its services and updates.</p>
        <form onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="public-email">Account email address</label>
            <input id="public-email" type="email" autoComplete="off" required value={email}
              onChange={event=>{setEmail(event.target.value);setError("");}} />
          </div>
          {error&&<p className="public-login-error" role="alert">{error}</p>}
          <button type="submit" className="public-primary-action">Continue to account</button>
        </form>
        <p className="public-login-note">These are example accounts. You do not need a password. Do not enter your own email address.</p>
      </div>
      <aside className="public-account-picker" aria-labelledby="example-accounts">
        <h2 id="example-accounts">Choose a resident</h2>
        <p>Select a name to fill in the email address.</p>
        <div className="public-account-options">
          {DEMO_RESIDENTS.map(person=><button type="button" key={person.key}
            className={email.toLowerCase()===person.account.email.toLowerCase()?"selected":""}
            aria-pressed={email.toLowerCase()===person.account.email.toLowerCase()}
            onClick={()=>{setEmail(person.account.email);setError("");}}>
            <strong>{person.account.first} {person.account.last}</strong>
            <span>{person.context}</span>
          </button>)}
        </div>
      </aside>
    </div>
  </div>;
}

const CARD_PLACES_PUBLIC=[
  {name:"Libraries",what:"Borrow books, use computers and print. The library learns your card is valid.",img:"/assets/watkins-library-2030.jpg",alt:"People arriving at the Watkins Public Library entrance"},
  {name:"RTD buses and trains",what:"Pay your fare from your MyRide balance. RTD learns a fare was paid.",img:"/assets/central-station-2030.jpg",alt:"Riders waiting for a light rail train at Central Station"},
  {name:"Recreation centers, pools and parks",what:"Enter with your resident pass. The center learns your pass is active.",img:"/assets/box-elder-greenway-2030.jpg",alt:"A trail on the Box Elder Creek greenway"},
  {name:"City and county offices",what:"Use the card as photo ID at city and county service counters.",img:"/assets/civic-square-2030.jpg",alt:"Civic Square at sunset"},
];

export function PublicCard({onSignIn}:{onSignIn:()=>void}){
  return <div className="public-home public-card">
    <section className="home-hero" aria-labelledby="card-title">
      <img className="home-hero-image" src="/assets/watkins-library-2030.jpg" alt="A resident taps a card at the reader beside the Watkins Public Library doors" />
      <div className="home-container">
        <div className="home-hero-panel">
          <h1 id="card-title">The East Detroit Card</h1>
          <p>One photo ID for the library, recreation centers and RTD buses and trains. Carry the plastic card or add it to your phone's wallet.</p>
          <p className="home-signin-line">Already have a card? <button type="button" className="home-inline-link" onClick={onSignIn}>Sign in to see where it works</button></p>
        </div>
      </div>
    </section>

    <section className="home-container home-services" aria-labelledby="card-where">
      <h2 id="card-where">Where the card works</h2>
      <p className="home-section-lede">Tap the card or your phone at the reader.</p>
      <ul className="card-public-places">
        {CARD_PLACES_PUBLIC.map(p=><li key={p.name}>
          <img src={p.img} alt={p.alt} />
          <h3>{p.name}</h3>
          <p>{p.what}</p>
        </li>)}
      </ul>
    </section>

    <section className="home-container home-updates" aria-labelledby="card-answer">
      <div className="home-updates-copy">
        <h2 id="card-answer">Each place gets one answer</h2>
        <p>Your card holds only a number. When you tap, the reader asks the agency that runs that place one question, and the agency answers yes or no.</p>
        <p>A recreation center learns that your pass is active. It does not learn your address, your birth date or where else you used your card.</p>
      </div>
      <div className="home-birth card-answer-table">
        <h3>What each place learns</h3>
        <div className="table-scroll" role="region" aria-label="What each place learns" tabIndex={0}><table className="records-table">
          <thead><tr><th scope="col">Where you tap</th><th scope="col">The only answer it gets</th></tr></thead>
          <tbody>
            <tr><td>Library checkout</td><td>Library card valid</td></tr>
            <tr><td>Recreation center gate</td><td>Resident pass active</td></tr>
            <tr><td>RTD fare reader</td><td>Fare paid</td></tr>
            <tr><td>Senior or youth rate</td><td>Meets the age for the rate</td></tr>
            <tr><td>School front office</td><td>Listed parent or guardian</td></tr>
          </tbody>
        </table></div>
      </div>
    </section>

    <section className="home-agencies" aria-labelledby="card-privacy">
      <div className="home-container card-privacy">
        <h2 id="card-privacy">How your information is protected</h2>
        <ol className="card-promises">
          <li><strong>You choose for each place.</strong> Set each place to automatic, ask me each time, or off. Ask me each time sends a request to your phone before anything is shared.</li>
          <li><strong>You can see every check.</strong> Card activity lists each tap and each record lookup: who asked, when, what they learned and why.</li>
          <li><strong>Your records stay where they are.</strong> The library, RTD, the school district and each city office keep their own records. There is no single file about you.</li>
          <li><strong>Staff keep no copies of your documents.</strong> To get a card, you show proof of who you are and where you live. Staff check your documents and hand them back.</li>
          <li><strong>Staff never ask about immigration status.</strong> Any East Detroit resident can get a card.</li>
          <li><strong>Parents decide for children.</strong> A parent or guardian chooses whether a child's card connects to the school district.</li>
        </ol>
      </div>
    </section>

    <section className="home-container home-services" aria-labelledby="card-get">
      <h2 id="card-get">Get a card</h2>
      <ol className="card-steps">
        <li><strong>Make an appointment at a city service counter.</strong> The County Clerk issues cards.</li>
        <li><strong>Bring proof of identity and proof that you live in East Detroit.</strong> Staff check them and give them back.</li>
        <li><strong>Have your photo taken for the card.</strong> After you sign in to My East Detroit, you can add the card to your phone's wallet.</li>
      </ol>
      <p><button type="button" className="home-inline-link" onClick={onSignIn}>Sign in to My East Detroit</button></p>
    </section>
  </div>;
}
