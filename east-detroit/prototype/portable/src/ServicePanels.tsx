import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

export type Reservation={id:string;facility:string;date:string;time:string;status:"Confirmed"};
type Basic={sample:boolean};
type Fact={label:string;value:string};
const dateLabel=(s:string)=>new Date(s+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
function Facts({items}:{items:Fact[]}) {
 return <dl className="program-facts">{items.map(i=><div key={i.label}><dt>{i.label}</dt><dd>{i.value}</dd></div>)}</dl>;
}
function RecordHead({category,title,number,status,warning=false}:{category:string;title:string;number:string;status:string;warning?:boolean}) {
 return <div className="program-heading"><div><span className="record-type">{category}</span><h2>{title}</h2><p>{number}</p></div><span className={"status "+(warning?"status-info":"status-good")}>{status}</span></div>;
}
function Block({title,children,className=""}:{title:string;children:ReactNode;className?:string}) {
 return <section className={"program-section "+className}><h2>{title}</h2>{children}</section>;
}
function Empty({name}:{name:string}) {
 return <div className="empty-state"><h2>No {name} on file</h2><p>We could not find a record for this account. Contact the agency that provides this service if you think a record is missing.</p></div>;
}
export function ParksService({sample,resident,reservations,onBook,passNumber,validThrough}:Basic&{
  resident:string;reservations:Reservation[];onBook:(r:Reservation)=>void;passNumber?:string;validThrough?:string
}) {
 const [facility,setFacility]=useState("Watkins Recreation Center");
 const [date,setDate]=useState("2030-12-12");
 const [time,setTime]=useState("4:00 PM – 5:00 PM");
 const [error,setError]=useState("");
 if(!sample)return <Empty name="recreation pass"/>;
 function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!date){setError("Select a date.");return;}
  if(reservations.some(r=>r.facility===facility&&r.date===date&&r.time===time)){setError("This reservation is already on your account.");return;}
  onBook({id:"PRK-2030-"+String(1001+reservations.length),facility,date,time,status:"Confirmed"});
  setError("");
 }
 return <div className="program">
  <RecordHead category="Parks, Recreation and Cultural Affairs" title={resident} number={"Resident pass "+(passNumber||"REC-2030-2048")} status="Active"/>
  <Facts items={[
   {label:"Pass number",value:passNumber||"REC-2030-2048"},{label:"Membership",value:"City resident"},
   {label:"Valid through",value:validThrough||"March 31, 2031"},{label:"Facility access",value:"Resident rate"},
  ]}/>
  <Block title="My reservations">
   {reservations.length?<div className="table-scroll" role="region" aria-label="Recreation reservations" tabIndex={0}><table className="records-table"><thead><tr><th>Confirmation</th><th>Facility</th><th>Date and time</th><th>Status</th></tr></thead><tbody>{reservations.map(r=><tr key={r.id}><td><strong>{r.id}</strong></td><td>{r.facility}</td><td>{dateLabel(r.date)} · {r.time}</td><td><span className="status status-good">{r.status}</span></td></tr>)}</tbody></table></div>:<p className="muted-small">No reservations on file.</p>}
  </Block>
  <section className="form-section"><h2>Reserve a facility</h2>
   <form onSubmit={submit}>
    <div className="form-field"><label htmlFor="book-facility">Facility</label><select id="book-facility" value={facility} onChange={e=>setFacility(e.target.value)}><option>Watkins Recreation Center</option><option>Central Station Community Center</option><option>Inboden Park Pavilion</option></select></div>
    <div className="form-fields-inline"><div className="form-field"><label htmlFor="book-date">Date</label><input type="date" id="book-date" value={date} min="2030-12-05" max="2031-01-31" onChange={e=>setDate(e.target.value)} required/></div>
    <div className="form-field"><label htmlFor="book-time">Time</label><select id="book-time" value={time} onChange={e=>setTime(e.target.value)}><option>4:00 PM – 5:00 PM</option><option>5:00 PM – 6:00 PM</option><option>6:00 PM – 7:00 PM</option></select></div></div>
    {error&&<p className="field-error" role="alert">{error}</p>}
    <button className="program-submit" type="submit">Confirm reservation</button>
   </form>
  </section>
 </div>;
}
export function HousingService({sample,message,onSend}:Basic&{message:string;onSend:(message:string)=>void}){
 const [draft,setDraft]=useState("");
 if(!sample)return <Empty name="housing assistance application"/>;
 function send(e:FormEvent<HTMLFormElement>){e.preventDefault();if(draft.trim().length<10)return;onSend(draft.trim());setDraft("");}
 return <div className="program">
  <RecordHead category="City Housing Division / Local assistance" title="Housing assistance" number="Application HOU-2030-0371" status="In review" warning/>
  <Facts items={[
   {label:"Application received",value:"November 3, 2030"},{label:"Case number",value:"HOU-2030-0371"},
   {label:"Responsible office",value:"City Housing Division"},{label:"Next step",value:"Staff review"},
  ]}/>
  <Block title="Documents and verification">
   <div className="table-scroll" role="region" tabIndex={0} aria-label="Housing application documents"><table className="records-table"><thead><tr><th>Record</th><th>Received</th><th>Status</th></tr></thead><tbody>
     <tr><td>Application form</td><td>Nov. 3, 2030</td><td><span className="status status-good">Received</span></td></tr>
     <tr><td>Household statement</td><td>Nov. 3, 2030</td><td><span className="status status-good">Received</span></td></tr>
     <tr><td>Address check</td><td>Nov. 5, 2030</td><td><span className="status status-info">Under review</span></td></tr>
   </tbody></table></div>
  </Block>
  <Block title="Housing authority records" className="program-policy"><p>The Regional Housing Authority keeps its own housing voucher, waiting list and property records. This city application does not show them.</p></Block>
  <section className="form-section"><h2>Contact the Housing Division</h2>
   {message&&<div className="message-panel"><strong>Most recent message</strong><p>{message}</p></div>}
   <form onSubmit={send}><div className="form-field"><label htmlFor="housing-msg">Message to the Housing Division</label><textarea id="housing-msg" required minLength={10} rows={4} value={draft} onChange={e=>setDraft(e.target.value)}/></div><button className="program-submit" type="submit">Add message to application</button></form>
  </section>
 </div>;
}
export function LibraryService({sample,resident,renewed,onRenew,cardNumber,itemTitle,homeBranch}:Basic&{
  resident:string;renewed:boolean;onRenew:()=>void;cardNumber?:string;itemTitle?:string;homeBranch?:string
}){
 if(!sample)return <Empty name="library account"/>;
 return <div className="program">
  <RecordHead category="East Detroit Public Library District / Independent public agency" title="Library account" number={"Library card "+(cardNumber||"LIB-2030-0924")} status="Active"/>
  <Facts items={[
    {label:"Cardholder",value:resident},{label:"Card number",value:cardNumber||"LIB-2030-0924"},
    {label:"Home branch",value:homeBranch||"Watkins Public Library"},{label:"Account standing",value:"Good standing"},
  ]}/>
  <Block title="Checked-out items">
   <div className="table-scroll" role="region" tabIndex={0} aria-label="Library loans"><table className="records-table"><thead><tr><th>Item</th><th>Due date</th><th>Action</th></tr></thead><tbody><tr>
    <td><strong>{itemTitle||"Colorado Road Atlas"}</strong><small>Print collection</small></td>
    <td>{renewed?"Dec. 26, 2030":"Dec. 12, 2030"}</td>
    <td>{renewed?<span className="status status-good">Renewed</span>:<button className="table-link" onClick={onRenew}>Renew item</button>}</td>
   </tr></tbody></table></div>
  </Block>
  <Block title="Library records" className="program-policy"><p>The Library District keeps your library and borrowing records. Other city offices cannot see them here.</p></Block>
 </div>;
}
export function WaterService({sample,issue,onInquiry,accountNumber,serviceAddress,amountDue}:Basic&{
  issue:string;onInquiry:(issue:string)=>void;accountNumber?:string;serviceAddress?:string;amountDue?:string
}){
 const [draft,setDraft]=useState("");
 if(!sample)return <Empty name="utility account"/>;
 function send(e:FormEvent<HTMLFormElement>){e.preventDefault();if(draft.trim().length<10)return;onInquiry(draft.trim());setDraft("");}
 return <div className="program">
  <RecordHead category="East Detroit Water and Sewer Authority / Independent public agency" title="Water and sewer" number={"Utility account "+(accountNumber||"WSA-2030-00821")} status="Current"/>
  <Facts items={[
   {label:"Service address",value:serviceAddress||"14 Example Lane, Old Watkins, CO 80137"},
   {label:"Account number",value:accountNumber||"WSA-2030-00821"},
   {label:"Amount due",value:amountDue||"$82.40"},{label:"Due date",value:"December 15, 2030"},
  ]}/>
  <Block title="Billing history">
   <div className="table-scroll" role="region" tabIndex={0} aria-label="Water and sewer bills"><table className="records-table"><thead><tr><th>Statement</th><th>Service period</th><th>Amount</th><th>Status</th></tr></thead><tbody>
    <tr><td>November 2030</td><td>Oct. 1–31</td><td>{amountDue||"$82.40"}</td><td><span className="status status-warn">Due Dec. 15</span></td></tr>
    <tr><td>October 2030</td><td>Sept. 1–30</td><td>$75.18</td><td><span className="status status-good">Paid</span></td></tr>
   </tbody></table></div>
  </Block>
  <section className="form-section"><h2>Ask about a bill</h2>
   {issue&&<div className="message-panel"><strong>Your latest billing question</strong><p>{issue}</p></div>}
   <form onSubmit={send}><div className="form-field"><label htmlFor="water-msg">Your question</label><textarea id="water-msg" required minLength={10} rows={4} value={draft} onChange={e=>setDraft(e.target.value)}/></div><button className="program-submit" type="submit">Send billing question</button></form>
  </section>
 </div>;
}
