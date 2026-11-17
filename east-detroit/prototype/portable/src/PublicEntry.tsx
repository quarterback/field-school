import { useState } from "react";
import type { FormEvent } from "react";
import { DEMO_RESIDENTS } from "./DemoResidents";

type EntryProps = { onSignIn:()=>void };

export function PublicWelcome({onSignIn}:EntryProps){
  return <div className="public-entry">
    <section className="public-intro" aria-labelledby="public-title">
      <div className="public-intro-copy">
        <h1 id="public-title">Get city and county services in one place</h1>
        <p>Sign in to check your permits, bills, service requests and notices. You can also see information from the library, school district and other public agencies.</p>
        <button type="button" className="public-primary-action" onClick={onSignIn}>Sign in to My East Detroit</button>
      </div>
      <div className="public-feature" aria-label="Updates without another form">
        <h2>Some updates need no new form</h2>
        <p>When an agency already has the information it needs, it can make some updates for you. Sign in to see what changed and whether you need to do anything.</p>
      </div>
    </section>

    <section className="public-capabilities" aria-labelledby="public-can-do">
      <h2 id="public-can-do">What you can do here</h2>
      <div className="public-capability-grid">
        <article><h3>Check your records</h3><p>See the status of your business license, housing application, library loans and other services.</p></article>
        <article><h3>Get something done</h3><p>Book a recreation facility, renew a library loan, report a street problem or ask about a bill.</p></article>
        <article><h3>See updates</h3><p>Find out when an agency completes a task or needs more information from you.</p></article>
      </div>
    </section>

    <section className="public-service-note" aria-labelledby="public-agencies">
      <h2 id="public-agencies">Who keeps your records?</h2>
      <p>Each department and public agency keeps its own records and makes its own decisions. Using My East Detroit does not give every agency access to your information.</p>
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
