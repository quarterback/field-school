import { useState } from "react";
import type { FormEvent } from "react";
import { DEMO_RESIDENTS } from "./DemoResidents";

type EntryProps = { onSignIn:()=>void };

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

export function PublicWelcome({onSignIn}:EntryProps){
  const [query,setQuery]=useState("");
  const [submitted,setSubmitted]=useState("");
  const term=submitted.trim().toLowerCase();
  const services=term?POPULAR_SERVICES.filter(s=>(s.task+" "+s.owner).toLowerCase().includes(term)):POPULAR_SERVICES;
  function search(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setSubmitted(query);
    document.getElementById("public-services")?.scrollIntoView({behavior:"smooth",block:"start"});
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

    <section id="public-services" className="home-container home-services" aria-labelledby="public-services-title">
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
    <button type="button" className="back-link" onClick={onBack}>← Back to My East Detroit</button>
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
