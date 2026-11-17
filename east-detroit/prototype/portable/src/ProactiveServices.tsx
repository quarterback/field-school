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
      {resident==="maya"&&<tr><td><strong>Jordan Rivera</strong></td><td>Child</td><td>School enrollment on file with the Unified School District</td></tr>}
      {resident==="samira"&&event.birthRegistered&&
        <tr><td><strong>Lucia Ortiz</strong><small>Born November 12, 2030</small></td><td>Child</td><td>Birth registered · County Clerk / State Vital Records</td></tr>}
      {resident==="samira"&&!event.birthRegistered&&<tr><td colSpan={3}>No child birth record is available to this account.</td></tr>}
     </tbody>
    </table>
   </div>
   {resident==="samira"&&event.birthRegistered&&
     <Explain>Birth information comes from the state vital records system through a proposed, authorized county notification. This page shows the parent's household relationship, not a complete medical record.</Explain>}
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
       <div className="proactive-status"><State kind="good">Already updated</State></div>
       <div className="proactive-content"><h3>Lucia Ortiz added to your household</h3><p>The registered birth was matched to your account. No second birth form was needed.</p>
         <Explain>County Clerk and State Vital Records confirmed the birth and parent-child relationship. The portal received limited registration details, rather than a hospital chart.</Explain>
       </div>
       <button className="table-link" onClick={onFamily}>View family services →</button>
      </article>
      <article className="proactive-item">
       <div className="proactive-status"><State kind={offers.coverage?"good":"warn"}>{offers.coverage?"Coverage confirmed":"Review needed"}</State></div>
       <div className="proactive-content"><h3>Newborn health coverage</h3><p>{offers.coverage?"Health First Colorado coverage has been added to Lucia's case. No separate application was needed.":"The county is waiting for state confirmation before coverage can be shown."}</p>
         <Explain>The birth report was matched with the state's record showing the parent had qualifying coverage at delivery. Colorado's eligible-newborn rule provides coverage once the birth is reported. The state retains eligibility authority.</Explain>
       </div>
       <button className="table-link" onClick={onFamily}>View details →</button>
      </article>
      <article className="proactive-item">
       <div className="proactive-status"><State kind="info">Available to review</State></div>
       <div className="proactive-content"><h3>Infant and family support</h3><p>WIC information and an early-literacy card offer are available. No benefits or library records have been issued without the required process.</p>
         <Explain>The birth record indicates that a child under five lives in the household. WIC requires its own certification and the Library District has separate control over its services.</Explain>
       </div>
       <button className="table-link" onClick={onFamily}>Review offers →</button>
      </article>
    </>}
    {offers.business&&<article className="proactive-item">
      <div className="proactive-status"><State kind={offers.renewal?"good":"warn"}>{offers.renewal?"Renewed":"Review needed"}</State></div>
      <div className="proactive-content"><h3>Cypress Cafe food establishment license</h3>
       <p>{offers.renewal?"Renewed for 2031 from verified agency records. No renewal form was required.":"The automatic renewal is paused until Public Health resolves a record that needs review."}</p>
       <Explain>Proposed automatic-renewal arrangement: Public Health confirms the inspection and license details; Finance confirms the annual fee; the business has authorized automatic renewal. Any unresolved condition stops the renewal. The department retains approval authority.</Explain>
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
   <h2>What happened automatically</h2>
   <div className="table-scroll" role="region" aria-label="Automated family service actions" tabIndex={0}><table className="records-table">
    <thead><tr><th scope="col">Service</th><th scope="col">Department</th><th scope="col">Result</th></tr></thead>
    <tbody>
     <tr><td><strong>Household record</strong></td><td>County Clerk / State Vital Records</td><td><State kind="good">Updated</State></td></tr>
     <tr><td><strong>Newborn health coverage</strong></td><td>Colorado Human Services and State IT</td><td><State kind={event.childCoverage==="confirmed"?"good":"warn"}>{event.childCoverage==="confirmed"?"Coverage active":"State review"}</State></td></tr>
     <tr><td><strong>Family services notice</strong></td><td>County Human Services</td><td><State kind="good">Delivered to account</State></td></tr>
    </tbody>
   </table></div>
   <Explain>The county received the birth registration through a proposed authorized exchange. A verified parent coverage record permits the state to enroll an eligible newborn under Colorado rules. No income, birth-certificate image, or clinical chart was copied into the city account.</Explain>
  </section>
  <section className="program-section">
   <h2>Available for your family</h2>
   <div className="family-offer">
    <div><h3>WIC nutrition and infant support</h3><p>WIC may be available for Lucia. The program must confirm enrollment requirements and complete its own appointment.</p>
      <Explain>Colorado WIC covers eligible infants and young children. Participation in Medicaid can establish income eligibility, but WIC still requires program certification.</Explain>
    </div>
    <div><State kind={event.wicContact==="requested"?"good":"info"}>{event.wicContact==="requested"?"Contact requested":"Available"}</State>
     <button className="program-submit" type="button" disabled={event.wicContact==="requested"} onClick={()=>onAction("wic")}>{event.wicContact==="requested"?"Request saved":"Request WIC contact"}</button>
    </div>
   </div>
   <div className="family-offer">
    <div><h3>Public Library District early-literacy card</h3><p>The Library District could offer Lucia a library card using verified age and guardian information.</p>
      <Explain>Proposed participating agency: the independent Library District must authorize the card service, guardian verification, and disclosure rules.</Explain>
    </div>
    <div><State kind={event.libraryOffer==="accepted"?"good":"info"}>{event.libraryOffer==="accepted"?"Accepted":"Offered"}</State>
     <button className="program-submit" type="button" disabled={event.libraryOffer==="accepted"} onClick={()=>onAction("library")}>{event.libraryOffer==="accepted"?"Offer accepted":"Accept offer"}</button>
    </div>
   </div>
  </section>
 </div>;
}

export function RenewalRecord({event,tour,onAction}:ProactiveProps&{tour:boolean}){
 const renewed=isLicenseRenewed(event);
 return <section className="program-section renewal-record">
  <h2>Automatic renewal</h2>
  <p className="service-description">{renewed?"The 2031 renewal was completed from information already held by city-county departments. No renewal application was requested.":"Automatic renewal is paused. Public Health must resolve the outstanding check."}</p>
  <div className="table-scroll" tabIndex={0} role="region" aria-label="Food establishment renewal checks">
   <table className="records-table">
    <thead><tr><th scope="col">Check</th><th scope="col">Record owner</th><th scope="col">Result</th></tr></thead>
    <tbody>
     <tr><td>Inspection compliance</td><td>Public Health</td><td><State kind={event.inspectionClear?"good":"warn"}>{event.inspectionClear?"Clear":"Requires review"}</State></td></tr>
     <tr><td>Annual fee</td><td>Finance</td><td><State kind={event.feeSettled?"good":"warn"}>{event.feeSettled?"Settled":"Unpaid"}</State></td></tr>
     <tr><td>License holder / ownership</td><td>Public Health</td><td><State kind={event.ownershipUnchanged?"good":"warn"}>{event.ownershipUnchanged?"Unchanged":"Requires review"}</State></td></tr>
     <tr><td>Automatic-renewal authorization</td><td>License holder</td><td><State kind={event.automaticRenewalPermission?"good":"warn"}>{event.automaticRenewalPermission?"On file":"Not authorized"}</State></td></tr>
    </tbody>
   </table>
  </div>
  <Explain>Illustrative vendor rule, subject to agency approval: Public Health and Finance validate their records and submit the renewal in December. Any violation, changed ownership, unpaid fee, or missing authorization requires review. This demonstration does not change Colorado license law.</Explain>
  {tour&&<div className="scenario-control"><strong>Test a different inspection result</strong><p>Switch the Public Health record to see what blocks automatic renewal.</p>
    <button type="button" className="tour-button" onClick={()=>onAction(event.inspectionClear?"hold-inspection":"clear-inspection")}>{event.inspectionClear?"Flag inspection issue":"Restore clear inspection"}</button>
  </div>}
 </section>;
}
