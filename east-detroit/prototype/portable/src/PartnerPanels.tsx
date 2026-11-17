import type { ReactNode } from "react";

type Common = { sample: boolean };
type Fact = { name: string; value: string };
function Section({title,children}: {title:string;children:ReactNode}) {
  return <section className="program-section"><h2>{title}</h2>{children}</section>;
}
function Facts({items}: {items:Fact[]}) {
  return <dl className="program-facts">{items.map(f=><div key={f.name}><dt>{f.name}</dt><dd>{f.value}</dd></div>)}</dl>;
}
function AgencyRecord({agency,title,reference,status,children}:{
  agency:string;title:string;reference:string;status:string;children:ReactNode;
}) {
  return <div className="program">
    <header className="program-heading"><div><span className="record-type">{agency}</span><h2>{title}</h2><p>{reference}</p></div><span className="status status-info">{status}</span></header>
    {children}
  </div>;
}
function NoRecord({service,agency}: {service:string;agency:string}) {
  return <div className="empty-state"><h2>No {service} on file</h2><p>This account has no records from {agency}. Contact that agency for access to its services.</p></div>;
}

export function SchoolDistrictService({sample,requested,onRequest}:Common&{
  requested:boolean;onRequest:()=>void;
}) {
  if(!sample) return <NoRecord service="student enrollment record" agency="East Detroit Unified School District"/>;
  return <AgencyRecord
    agency="East Detroit Unified School District · Independently governed school district"
    title="Student enrollment" reference="School year 2030–31" status="Enrolled">
    <Facts items={[
      {name:"Student",value:"Jordan Rivera"},
      {name:"School",value:"Watkins Elementary School"},
      {name:"Grade",value:"4"},
      {name:"Enrollment status",value:"Active"},
      {name:"School year",value:"2030–2031"},
      {name:"Record holder",value:"East Detroit Unified School District"},
    ]}/>
    <Section title="Enrollment records">
      <div className="table-scroll" tabIndex={0} role="region" aria-label="School enrollment records">
        <table className="records-table">
          <thead><tr><th scope="col">Record</th><th scope="col">School year</th><th scope="col">Status</th></tr></thead>
          <tbody><tr><td><strong>Enrollment confirmation</strong></td><td>2030–31</td><td><span className="status status-good">Available</span></td></tr></tbody>
        </table>
      </div>
    </Section>
    <Section title="Request a verification letter">
      <p className="service-description">Ask the school district for a letter that confirms the student is enrolled.</p>
      <button type="button" className="program-submit" disabled={requested} onClick={onRequest}>
        {requested?"Letter requested":"Request enrollment verification"}
      </button>
      {requested&&<p className="service-feedback" role="status">Your request is saved. The school district has not issued the letter yet.</p>}
    </Section>
    <div className="agency-boundary"><strong>Who keeps this record?</strong><p>The school district decides where students enroll and keeps their school records. Your address alone does not decide which school they attend. This page does not share student records with other city offices.</p></div>
  </AgencyRecord>;
}

export function RegionalHousingService({sample,requested,onRequest}:Common&{
  requested:boolean;onRequest:()=>void;
}) {
  if(!sample)return <NoRecord service="housing authority record" agency="East Detroit Regional Housing Authority"/>;
  return <AgencyRecord
    agency="East Detroit Regional Housing Authority · Independent public housing authority"
    title="Housing authority" reference="Inquiry HA-2030-0216" status="Status available">
    <Facts items={[
      {name:"Program",value:"Housing choice assistance"},
      {name:"Authority reference",value:"HA-2030-0216"},
      {name:"Last update",value:"November 10, 2030"},
      {name:"Current status",value:"Inquiry received"},
      {name:"Responsible agency",value:"Regional Housing Authority"},
      {name:"City Housing Division case",value:"Not shown in this record"},
    ]}/>
    <Section title="Authority correspondence">
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Housing authority correspondence">
        <table className="records-table"><thead><tr><th scope="col">Document</th><th scope="col">Date</th><th scope="col">Status</th></tr></thead>
        <tbody><tr><td><strong>Inquiry receipt</strong></td><td>Nov. 10, 2030</td><td><span className="status status-good">Received</span></td></tr></tbody></table>
      </div>
    </Section>
    <Section title="Request an update">
      <p className="service-description">Ask the housing authority to review your request and tell you what happens next.</p>
      <button className="program-submit" type="button" disabled={requested} onClick={onRequest}>{requested?"Update requested":"Request status update"}</button>
      {requested&&<p className="service-feedback" role="status">Your request is saved. The housing authority has not made a decision.</p>}
    </Section>
    <div className="agency-boundary"><strong>Who keeps this record?</strong><p>The Regional Housing Authority keeps its own housing voucher, waiting list and income records. The City Housing Division cannot see them through this account.</p></div>
  </AgencyRecord>;
}

type LimitedServiceProps={title:string;agency:string;reason:string;outsideSystem:string};
export function LimitedService({title,agency,reason,outsideSystem}:LimitedServiceProps){
  return <div className="program">
    <header className="program-heading"><div><span className="record-type">{agency}</span><h2>{title}</h2><p>Contact this agency for service</p></div><span className="status status-neutral">Other agency</span></header>
    <section className="program-section"><h2>How to get this service</h2><p className="service-description">{outsideSystem}</p></section>
    <div className="agency-boundary"><strong>Who keeps this record?</strong><p>{reason}</p></div>
  </div>;
}
