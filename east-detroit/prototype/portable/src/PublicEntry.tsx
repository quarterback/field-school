import { useState } from "react";
import type { FormEvent } from "react";
import { DEMO_RESIDENTS } from "./DemoResidents";

type EntryProps = { onSignIn:()=>void };

export function PublicWelcome({onSignIn}:EntryProps){
  return <div className="public-entry">
    <section className="public-intro" aria-labelledby="public-title">
      <div className="public-intro-copy">
        <h1 id="public-title">Your public services, in one place.</h1>
        <p>See your city and county services alongside information from participating public agencies. When a change is already verified, some services can be updated without another application.</p>
        <button type="button" className="public-primary-action" onClick={onSignIn}>Sign in to My East Detroit</button>
      </div>
      <div className="public-feature" aria-label="Services that work together">
        <h2>Less paperwork when life changes</h2>
        <p>A registered birth can start family services. A license can renew when required records are already clear. Your account shows what has happened and what still needs your attention.</p>
      </div>
    </section>

    <section className="public-capabilities" aria-labelledby="public-can-do">
      <h2 id="public-can-do">What you can do here</h2>
      <div className="public-capability-grid">
        <article><h3>See what's already handled</h3><p>Review completed updates, notices and decisions without starting another request.</p></article>
        <article><h3>Take care of what remains</h3><p>Confirm an offer, book a facility, send a question or check a service request.</p></article>
        <article><h3>Find the right agency</h3><p>See services from the city-county and separately governed school, library, water, transit and housing agencies.</p></article>
      </div>
    </section>

    <section className="public-service-note" aria-labelledby="public-agencies">
      <h2 id="public-agencies">Your records stay with the agencies responsible for them.</h2>
      <p>My East Detroit brings participating services together. Each department or public agency remains responsible for its own records, rules and decisions.</p>
      <button type="button" className="public-text-action" onClick={onSignIn}>Access your account <span aria-hidden="true">→</span></button>
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
      setError("Choose one of the sample accounts below to continue.");
      return;
    }
    setError("");
    onContinue(person.key);
  }
  return <div className="public-login">
    <button type="button" className="back-link" onClick={onBack}>← Back to My East Detroit</button>
    <div className="public-login-layout">
      <div className="public-login-form">
        <h1>Sign in</h1>
        <p>Access your services and updates through My East Detroit.</p>
        <form onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="public-email">Email address</label>
            <input id="public-email" type="email" autoComplete="username" required value={email}
              onChange={event=>{setEmail(event.target.value);setError("");}} />
          </div>
          {error&&<p className="public-login-error" role="alert">{error}</p>}
          <button type="submit" className="public-primary-action">Continue</button>
        </form>
        <p className="public-login-note">This preview uses sample accounts. No password or identity verification is required. Please do not enter personal information.</p>
      </div>
      <aside className="public-account-picker" aria-labelledby="example-accounts">
        <h2 id="example-accounts">Try an example account</h2>
        <p>Select a resident to fill the email field, then continue to their services.</p>
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
