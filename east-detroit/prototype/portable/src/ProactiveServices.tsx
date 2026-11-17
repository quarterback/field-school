import type { ReactNode } from "react";

export type LifeEventState={
  birthRegistered:boolean;
  childCoverage:"confirmed"|"pending";
  wicContact:"not-requested"|"requested";
  libraryOffer:"not-accepted"|"accepted";
  inspectionClear:boolean;
  feeSettled:boolean;
  ownershipUnchanged:boolean;
  automaticRenewalPermission:boolean;
};

export const LIFE_EVENT_SEED:LifeEventState={
  birthRegistered:true,
  childCoverage:"confirmed",
  wicContact:"not-requested",
  libraryOffer:"not-accepted",
  inspectionClear:true,
  feeSettled:true,
  ownershipUnchanged:true,
  automaticRenewalPermission:true,
};

export function isLicenseRenewed(state:LifeEventState){
  return state.inspectionClear&&state.feeSettled&&state.ownershipUnchanged&&state.automaticRenewalPermission;
}

export function getOffers(person:string,event:LifeEventState){
 const newborn=person==="samira"&&event.birthRegistered;
 const business=person==="maya";
 return {
   newborn,
   business,
   renewal:business&&isLicenseRenewed(event),
   coverage:newborn&&event.childCoverage==="confirmed",
   wic:newborn,
   library:newborn,
 };
}

export type ProactiveProps={
  event:LifeEventState;
  onAction:(action:"wic"|"library"|"replay-birth"|"restore-birth"|"hold-inspection"|"clear-inspection")=>void;
};

function Explain({children}:{children:ReactNode}){
 return <details className="service-provenance"><summary>Why am I seeing this?</summary><div>{children}</div></details>;
}
function State({children,kind="info"}:{children:string;kind?:"good"|"warn"|"info"}){
 return <span className={"status status-"+kind}>{children}</span>;
}

export function HouseholdSection({resident,event,onAction}:ProactiveProps&{resident:string}){
 if(resident!=="samira"&&resident!=="maya")return null;
 return <section className="section-block household">
   <div className="section-heading"><h2>My household</h2></div>
   <div className="table-scroll" role="region" aria-label="Household members" tabIndex={0}>
    <table className="records-table">
     <thead><tr><th scope="col">Name</th><th scope="col">Relationship</th><th scope="col">Record</th></tr></thead>
     <tbody>
      {resident==="maya"&&<tr><td><strong>Jordan Rivera</strong></td><td>Child</td><td>The school district has Jordan's enrollment record</td></tr>}
      {resident==="samira"&&event.birthRegistered&&
        <tr><td><strong>Lucia Ortiz</strong><small>Born November 12, 2030</small></td><td>Child</td><td>Birth recorded by the County Clerk and the state</td></tr>}
      {resident==="samira"&&!event.birthRegistered&&<tr><td colSpan={3}>This account does not show a birth record.</td></tr>}
     </tbody>
    </table>
   </div>
   {resident==="samira"&&event.birthRegistered&&
     <Explain>The state sent the county the child's birth details and the parent's name. It did not send medical records.</Explain>}
 </section>;
}

export function ProactiveHome({resident,event,onAction,onLicense,onFamily}:ProactiveProps&{
 resident:string;onLicense:()=>void;onFamily:()=>void;
}){
 const offers=getOffers(resident,event);
 if(!offers.newborn&&!offers.business)return null;
 return <section className="section-block proactive-home" aria-labelledby="proactive-title">
   <div className="section-heading"><h2 id="proactive-title">Updates for you</h2></div>
   <div className="proactive-list">
    {offers.newborn&&<>
      <article className="proactive-item">
       <div className="proactive-status"><State kind="good">Updated</State></div>
       <div className="proactive-content"><h3>Lucia Ortiz added to your household</h3><p>The County Clerk added Lucia after the state confirmed her birth. You do not need to report the birth again.</p>
         <Explain>The County Clerk and State Vital Records confirmed the birth and parent-child relationship. They did not share hospital records with this account.</Explain>
       </div>
       <button className="table-link" onClick={onFamily}>View family services →</button>
      </article>
      <article className="proactive-item">
       <div className="proactive-status"><State kind={offers.coverage?"good":"warn"}>{offers.coverage?"Coverage confirmed":"Review needed"}</State></div>
       <div className="proactive-content"><h3>Newborn health coverage</h3><p>{offers.coverage?"Health First Colorado added Lucia to your coverage. You did not need to apply again.":"The county is waiting for the state to confirm Lucia's coverage."}</p>
         <Explain>The state checked the birth report against the parent's health coverage. Under Colorado's newborn coverage rules, eligible children receive coverage when their birth is reported. The state makes the final decision.</Explain>
       </div>
       <button className="table-link" onClick={onFamily}>View details →</button>
      </article>
      <article className="proactive-item">
       <div className="proactive-status"><State kind="info">Your choice</State></div>
       <div className="proactive-content"><h3>Food support and a library card</h3><p>You can ask WIC to contact you about food and nutrition support. You can also request a library card for Lucia. Each program will review your request.</p>
         <Explain>WIC uses the child's age to help determine whether your family can apply. WIC must still check eligibility. The Library District handles library cards separately.</Explain>
       </div>
       <button className="table-link" onClick={onFamily}>Review offers →</button>
      </article>
    </>}
    {offers.business&&<article className="proactive-item">
      <div className="proactive-status"><State kind={offers.renewal?"good":"warn"}>{offers.renewal?"Renewed":"Review needed"}</State></div>
      <div className="proactive-content"><h3>Cypress Cafe food establishment license</h3>
       <p>{offers.renewal?"Public Health and Finance checked their records and renewed your license for 2031. You did not need to apply.":"Public Health must check a record before it can renew your license."}</p>
       <Explain>Public Health checks your inspection and license details. Finance checks your annual fee. If a record needs attention, Public Health must review it before renewal.</Explain>
      </div>
      <button className="table-link" onClick={onLicense}>{offers.renewal?"View renewal":"View required review"} →</button>
    </article>}
   </div>
 </section>;
}

export function FamilyService({event,onAction,tour}:ProactiveProps&{tour:boolean}){
 if(!event.birthRegistered)return <div className="empty-state"><h2>No recent birth record</h2><p>No new child has been reported to this account.</p>
   {tour&&<button type="button" className="program-submit" onClick={()=>onAction("restore-birth")}>Simulate birth registration</button>}</div>;
 return <div className="family-detail">
  <div className="program-heading"><div><span className="record-type">County Clerk / State Vital Records</span><h2>Lucia Ortiz</h2><p>Birth registered · November 12, 2030</p></div><State kind="good">Recorded</State></div>
  <dl className="program-facts">
   <div><dt>Child</dt><dd>Lucia Ortiz</dd></div>
   <div><dt>Date of birth</dt><dd>November 12, 2030</dd></div>
   <div><dt>Parent</dt><dd>Samira Ortiz</dd></div>
   <div><dt>Birth record holder</dt><dd>State Vital Records</dd></div>
  </dl>
  <section className="program-section">
   <h2>Updates already made</h2>
   <div className="table-scroll" role="region" aria-label="Automated family service actions" tabIndex={0}><table className="records-table">
    <thead><tr><th scope="col">Service</th><th scope="col">Department</th><th scope="col">Result</th></tr></thead>
    <tbody>
     <tr><td><strong>Household record</strong></td><td>County Clerk / State Vital Records</td><td><State kind="good">Updated</State></td></tr>
     <tr><td><strong>Newborn health coverage</strong></td><td>Colorado Human Services and State IT</td><td><State kind={event.childCoverage==="confirmed"?"good":"warn"}>{event.childCoverage==="confirmed"?"Coverage active":"State review"}</State></td></tr>
     <tr><td><strong>Family services notice</strong></td><td>County Human Services</td><td><State kind="good">Delivered to account</State></td></tr>
    </tbody>
   </table></div>
   <Explain>State Vital Records sent the birth details to the county. The state checked the parent's coverage and enrolled Lucia under Colorado's newborn rules. The city account did not receive income records, a birth certificate image or medical records.</Explain>
  </section>
  <section className="program-section">
   <h2>Available for your family</h2>
   <div className="family-offer">
    <div><h3>WIC food and nutrition support</h3><p>WIC helps eligible families get food and nutrition support. Ask WIC to contact you to find out whether Lucia qualifies.</p>
      <Explain>WIC serves eligible infants and young children. Having Medicaid can help establish income eligibility, but WIC must still review your information and enroll you.</Explain>
    </div>
    <div><State kind={event.wicContact==="requested"?"good":"info"}>{event.wicContact==="requested"?"Contact requested":"You can request contact"}</State>
     <button className="program-submit" type="button" disabled={event.wicContact==="requested"} onClick={()=>onAction("wic")}>{event.wicContact==="requested"?"Request saved":"Request WIC contact"}</button>
    </div>
   </div>
   <div className="family-offer">
    <div><h3>A library card for Lucia</h3><p>The Library District can help you get a card for Lucia. It will check her age and your relationship to her first.</p>
      <Explain>The Library District decides how to issue cards and what information it needs from a parent or guardian.</Explain>
    </div>
    <div><State kind={event.libraryOffer==="accepted"?"good":"info"}>{event.libraryOffer==="accepted"?"Accepted":"Available"}</State>
     <button className="program-submit" type="button" disabled={event.libraryOffer==="accepted"} onClick={()=>onAction("library")}>{event.libraryOffer==="accepted"?"Offer accepted":"Accept offer"}</button>
    </div>
   </div>
  </section>
 </div>;
}

export function RenewalRecord({event,tour,onAction}:ProactiveProps&{tour:boolean}){
 const renewed=isLicenseRenewed(event);
 return <section className="program-section renewal-record">
  <h2>How your license renews</h2>
  <p className="service-description">{renewed?"Public Health and Finance checked their records and renewed your license for 2031. You did not need to fill out another form.":"Public Health must check a record before your license can renew."}</p>
  <div className="table-scroll" tabIndex={0} role="region" aria-label="Food establishment renewal checks">
   <table className="records-table">
    <thead><tr><th scope="col">Check</th><th scope="col">Record owner</th><th scope="col">Result</th></tr></thead>
    <tbody>
     <tr><td>Health inspection</td><td>Public Health</td><td><State kind={event.inspectionClear?"good":"warn"}>{event.inspectionClear?"Clear":"Requires review"}</State></td></tr>
     <tr><td>Annual fee</td><td>Finance</td><td><State kind={event.feeSettled?"good":"warn"}>{event.feeSettled?"Paid":"Unpaid"}</State></td></tr>
     <tr><td>Business owner</td><td>Public Health</td><td><State kind={event.ownershipUnchanged?"good":"warn"}>{event.ownershipUnchanged?"Unchanged":"Requires review"}</State></td></tr>
     <tr><td>Permission to renew automatically</td><td>License holder</td><td><State kind={event.automaticRenewalPermission?"good":"warn"}>{event.automaticRenewalPermission?"On file":"Not authorized"}</State></td></tr>
    </tbody>
   </table>
  </div>
  <Explain>Public Health checks the inspection and business owner. Finance checks that you paid the annual fee. They renew your license only if you gave permission and all required checks pass.</Explain>
  {tour&&<div className="scenario-control"><strong>Test a different inspection result</strong><p>Switch the Public Health record to see what blocks automatic renewal.</p>
    <button type="button" className="tour-button" onClick={()=>onAction(event.inspectionClear?"hold-inspection":"clear-inspection")}>{event.inspectionClear?"Flag inspection issue":"Restore clear inspection"}</button>
  </div>}
 </section>;
}
