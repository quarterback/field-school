import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button, TextInput } from "hds-react";
import "./east-detroit.css";

type Page = "home" | "services" | "license" | "requests" | "account" | "register" | "service";
type ServiceKey = "recreation" | "license" | "housing" | "library" | "water" | "requests";
type Account = { id: string; first: string; last: string; email: string; address: string; postal: string; created: string };
type Ticket = { id: string; category: string; description: string; location: string; created: string; status: string };
type Activity = { id: string; date: string; description: string; office: string };
type Portal = {
  account: Account;
  licenseSubmitted: boolean;
  library: "not-linked" | "requested";
  water: "not-linked" | "requested";
  referral: boolean;
  tickets: Ticket[];
  activity: Activity[];
};
const KEY = "east-detroit-resident-portal-v1";
const sampleAccount: Account = {
  id: "ED-2030-00482", first: "Maya", last: "Rivera", email: "maya.rivera@example.org",
  address: "14 Example Lane, Old Watkins", postal: "80137", created: "2030-09-11",
};
const initial: Portal = {
  account: sampleAccount, licenseSubmitted: false, library: "not-linked", water: "not-linked", referral: false,
  tickets: [{ id: "SR-2030-1048", category: "Street and sidewalk", description: "Streetlight outside the community center is out.", location: "Old Watkins", created: "2030-11-07", status: "In progress" }],
  activity: [
    { id: "ACT-02", date: "2030-11-09", description: "Recreation pass linked to your account", office: "Parks and Recreation" },
    { id: "ACT-01", date: "2030-11-07", description: "Service request SR-2030-1048 received", office: "Public Works" },
  ],
};
const catalog: {key:ServiceKey;title:string;office:string;description:string;independent:boolean}[] = [
  {key:"recreation",title:"Recreation pass",office:"Parks, Recreation and Cultural Affairs",description:"View your recreation pass and membership details.",independent:false},
  {key:"license",title:"Business licences and permits",office:"Public Health · Finance",description:"View a business licence, track a renewal and check its status.",independent:false},
  {key:"housing",title:"Local housing assistance",office:"City Housing Division",description:"Review the status of a local housing assistance application.",independent:false},
  {key:"requests",title:"Report a local problem",office:"Transportation and Public Works",description:"Report a street, drainage or public-space issue and track a request.",independent:false},
  {key:"library",title:"Public library account",office:"East Detroit Public Library District",description:"Connect a separately governed library account.",independent:true},
  {key:"water",title:"Water and sewer account",office:"East Detroit Water and Sewer Authority",description:"Request access to your separately managed utility account.",independent:true},
];
const SAMPLE_LICENSE = "FOOD-2030-0184";
const titleFor = (page:Page) => ({
  home:"My account",services:"City services",license:"Business licences and permits",
  requests:"My service requests",account:"Account and privacy",register:"Create a demo account",service:"Service details",
})[page];
function makeId(prefix:string) {
  return prefix + Math.floor(1000 + Math.random()*9000).toString();
}
function readPortal():Portal {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const value = JSON.parse(raw) as Portal;
      if (value.account?.id && Array.isArray(value.tickets) && Array.isArray(value.activity)) return value;
    }
  } catch { /* invalid or unavailable browser storage */ }
  return initial;
}
function saveDownload(filename:string, contents:string) {
  const url = URL.createObjectURL(new Blob([contents],{type:"application/json"}));
  const a=document.createElement("a"); a.href=url; a.download=filename; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500);
}
function dateFormat(value:string) {
  try { return new Date(value+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}); }
  catch { return value; }
}
function Badge({children,tone="neutral"}:{children:string;tone?:"neutral"|"good"|"warn"|"info"}) {
  return <span className={"status status-"+tone}>{children}</span>;
}
function Action({children,onClick,secondary=false,disabled=false,type="button"}:{
 children:string;onClick?:()=>void;secondary?:boolean;disabled?:boolean;type?:"button"|"submit"
}) {
  return <Button
    type={type} onClick={onClick} disabled={disabled}
    variant={secondary?"secondary":"primary"}
    theme={secondary?{
      "--background-color":"#fdffff","--background-color-hover":"#eef1ed","--background-color-active":"#e6ece7",
      "--border-color":"#171717","--border-color-hover":"#171717","--border-color-active":"#171717",
      "--color":"#171717","--color-hover":"#171717","--color-active":"#171717","--outline-color-focus":"#171717",
    }:{
      "--background-color":"#b10f2e","--background-color-hover":"#790a20","--background-color-active":"#790a20",
      "--border-color":"#b10f2e","--border-color-hover":"#790a20","--border-color-active":"#790a20",
      "--color":"#fdffff","--color-hover":"#fdffff","--color-active":"#fdffff","--outline-color-focus":"#171717",
    }}
    className="action-button"
  >{children}</Button>;
}
export default function App() {
 const [data,setData] = useState<Portal>(readPortal);
 const [page,setPage] = useState<Page>("home");
 const [selected,setSelected] = useState<ServiceKey>("recreation");
 const [notice,setNotice] = useState("");
 const [showMenu,setShowMenu] = useState(false);
 const [serviceSearch,setServiceSearch] = useState("");
 const [requestForm,setRequestForm] = useState({category:"Street and sidewalk",location:"",description:""});
 const [renewAcknowledged,setRenewAcknowledged] = useState(false);
 const [signup,setSignup] = useState({first:"",last:"",email:"",address:"",postal:"80137",accepted:false});
 const sample = data.account.id===sampleAccount.id;
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(data));}catch{}},[data]);
 function go(next:Page) {setPage(next);setNotice("");setShowMenu(false);window.scrollTo({top:0,behavior:"auto"});}
 function openService(key:ServiceKey) {
   setSelected(key);
   if(key==="license") go("license");
   else if(key==="requests") go("requests");
   else go("service");
 }
 function serviceStatus(key:ServiceKey) {
   if(key==="recreation")return sample?"Active":"Not linked";
   if(key==="license")return sample?(data.licenseSubmitted?"Renewal submitted":"Renewal due"):"No licence linked";
   if(key==="housing")return sample?"In review":"No application";
   if(key==="requests")return data.tickets.some(t=>t.status!=="Closed")?"Open request":"No requests";
   if(key==="library")return data.library==="requested"?"Connection requested":"Not connected";
   return data.water==="requested"?"Connection requested":"Not connected";
 }
 function tone(key:ServiceKey):"neutral"|"good"|"warn"|"info" {
   const s=serviceStatus(key);
   return s==="Active"?"good":s==="Renewal due"?"warn":s==="In review"||s==="Open request"||s==="Connection requested"||s==="Renewal submitted"?"info":"neutral";
 }
 function actionLabel(key:ServiceKey) {
   if(key==="license")return sample?"View and renew":"Find out more";
   if(key==="requests")return "View requests";
   if(key==="recreation")return sample?"View pass":"Explore";
   if(key==="housing")return sample?"View application":"Explore";
   return serviceStatus(key)==="Connection requested"?"View request":"Connect";
 }
 function addActivity(description:string,office:string) {
   return {id:makeId("ACT-"),date:"2030-11-17",description,office};
 }
 function connect(which:"library"|"water") {
   if(data[which]==="requested"){setNotice("A connection request is already recorded.");return;}
   const office=which==="library"?"Public Library District":"Water and Sewer Authority";
   setData(prev=>({...prev,[which]:"requested",activity:[addActivity("Connection request recorded for "+office,office),...prev.activity]}));
   setNotice("Request recorded. This does not connect or disclose any "+(which==="library"?"library":"utility")+" records.");
 }
 function submitRenewal(event:FormEvent<HTMLFormElement>) {
   event.preventDefault();
   if(!renewAcknowledged) {setNotice("Confirm that the business details are unchanged.");return;}
   if(data.licenseSubmitted) return;
   setData(prev=>({...prev,licenseSubmitted:true,activity:[addActivity("Food licence renewal submitted for review","Public Health"),...prev.activity]}));
   setNotice("Renewal submitted in this demonstration. Public Health still must review the licence and inspections. No payment was taken.");
 }
 function submitRequest(event:FormEvent<HTMLFormElement>) {
   event.preventDefault();
   if(!requestForm.description.trim() || !requestForm.location.trim()) {setNotice("Add a location and a description.");return;}
   const ticket:Ticket={id:makeId("SR-2030-"),category:requestForm.category,description:requestForm.description.trim(),location:requestForm.location.trim(),created:"2030-11-17",status:"Received"};
   setData(prev=>({...prev,tickets:[ticket,...prev.tickets],activity:[addActivity("Service request "+ticket.id+" received","Public Works"),...prev.activity]}));
   setRequestForm({category:"Street and sidewalk",location:"",description:""});
   setNotice("Request "+ticket.id+" received in the simulation. No report was sent to a real department.");
 }
 function submitSignup(event:FormEvent<HTMLFormElement>) {
   event.preventDefault();
   if(!signup.first.trim()||!signup.last.trim()||!signup.email.includes("@")||!signup.address.trim()||!signup.accepted) {
     setNotice("Complete the required fields and confirm that this is a simulated account.");return;
   }
   const account:Account={id:makeId("ED-2030-"),first:signup.first.trim(),last:signup.last.trim(),email:signup.email.trim(),address:signup.address.trim(),postal:signup.postal,created:"2030-11-17"};
   setData({account,licenseSubmitted:false,library:"not-linked",water:"not-linked",referral:false,tickets:[],activity:[addActivity("Demo account created; identity not verified","City account service")]});
   setNotice("");
   go("home");
 }
 function restoreDemo() {if(!window.confirm("Replace this local session with the original sample resident?"))return;setData(initial);setNotice("Sample resident restored.");go("home");}
 function selectNav(p:Page) {go(p);}
 const nav:{page:Page;label:string}[]=[
   {page:"home",label:"Home"},{page:"services",label:"City services"},{page:"license",label:"Licences and permits"},
   {page:"requests",label:"My requests"},{page:"account",label:"Account and privacy"},
 ];
 const matchingCatalog=catalog.filter(c=>(c.title+" "+c.office+" "+c.description).toLowerCase().includes(serviceSearch.toLowerCase()));
 const current=catalog.find(c=>c.key===selected)||catalog[0];
 return <div className="portal">
   <a href="#page-main" className="skip-link">Skip to main content</a>
   <div className="topline"><div className="site-container"><span>City and County of East Detroit</span><span>2030 municipal services demonstration</span></div></div>
   <header className="site-header"><div className="site-container head-inner">
     <button className="city-brand" onClick={()=>go("home")} aria-label="East Detroit account home">
       <span className="city-seal" aria-hidden="true">ED</span>
       <span><strong>East Detroit</strong><small>City and County Services</small></span>
     </button>
     <div className="head-actions"><Badge tone="warn">Simulation</Badge><button className="account-menu" onClick={()=>go("account")}>My account <span aria-hidden="true">›</span></button></div>
   </div></header>
   <div className="nav-shell"><div className="site-container nav-inner">
     <button className="mobile-nav-btn" aria-expanded={showMenu} onClick={()=>setShowMenu(!showMenu)}>Menu <span aria-hidden="true">{showMenu?"−":"+"}</span></button>
     <nav className={"primary-nav "+(showMenu?"expanded":"")} aria-label="Main menu">
       {nav.map(item=><button key={item.page} className={page===item.page?"active":""} onClick={()=>selectNav(item.page)} aria-current={page===item.page?"page":undefined}>{item.label}</button>)}
     </nav>
   </div></div>
   <main id="page-main" className="site-container main-content">
     <div className="demonstration-note" role="note"><strong>Training environment.</strong> All people, records, IDs and transactions shown here are simulated. No real government account is created.</div>
     {page==="home"&&<>
       <div className="page-intro intro-row"><div><h1>My East Detroit</h1><p>Welcome, {data.account.first}. Access services linked to your city account.</p></div><div className="account-summary"><span>Resident account ID</span><strong>{data.account.id}</strong><small>Demo reference · Not proof of identity</small></div></div>
       <section className="section-block">
         <div className="section-heading"><h2>My services</h2><button className="text-link" onClick={()=>go("services")}>Browse all services <span aria-hidden="true">→</span></button></div>
         <div className="table-scroll"><table className="records-table"><thead><tr><th scope="col">Service</th><th scope="col">Responsible office</th><th scope="col">Status</th><th scope="col"><span className="visually-hidden">Action</span></th></tr></thead>
         <tbody>{catalog.map(c=><tr key={c.key}>
           <td><strong>{c.title}</strong>{c.independent&&<small>Separate public agency</small>}</td>
           <td>{c.office}</td><td><Badge tone={tone(c.key)}>{serviceStatus(c.key)}</Badge></td>
           <td className="action-cell"><button className="table-link" onClick={()=>openService(c.key)}>{actionLabel(c.key)} <span aria-hidden="true">→</span></button></td>
         </tr>)}</tbody></table></div>
       </section>
       <div className="home-lower">
         <section className="section-block recent"><div className="section-heading"><h2>Recent activity</h2><button className="text-link" onClick={()=>go("account")}>Account history <span aria-hidden="true">→</span></button></div>
           <ol className="activity-list">{data.activity.slice(0,4).map(a=><li key={a.id}><div><strong>{a.description}</strong><span>{a.office}</span></div><time>{dateFormat(a.date)}</time></li>)}</ol>
         </section>
         <aside className="help-panel"><h2>Need to report a problem?</h2><p>Report a road, drainage, address or public-space issue to the city.</p><Action onClick={()=>go("requests")}>Start a service request</Action></aside>
       </div>
     </>}
     {page==="services"&&<>
       <div className="page-intro"><h1>City services</h1><p>Find services available through your East Detroit account. Some agencies have separate records and require their own approval.</p></div>
       <div className="filter-bar"><label htmlFor="service-search">Find a service</label><input id="service-search" type="search" placeholder="Search services or departments" value={serviceSearch} onChange={e=>setServiceSearch(e.target.value)}/></div>
       <div className="directory-list">{matchingCatalog.map(c=><article className="directory-row" key={c.key}>
         <div><h2>{c.title}</h2><p>{c.description}</p><small>{c.office}{c.independent?" · Independent agency":""}</small></div>
         <div className="directory-action"><Badge tone={tone(c.key)}>{serviceStatus(c.key)}</Badge><button className="table-link" onClick={()=>openService(c.key)}>{actionLabel(c.key)} <span aria-hidden="true">→</span></button></div>
       </article>)}
       {matchingCatalog.length===0&&<p className="empty-state">No services match your search.</p>}</div>
     </>}
     {page==="license"&&<>
       <div className="page-intro"><button className="back-link" onClick={()=>go("home")}>← My services</button><h1>Business licence</h1><p>Review an existing licence or submit a renewal request.</p></div>
       {!sample?<div className="empty-state"><h2>No licence linked</h2><p>No business licence is connected to this demo account. A real service would require a separate account-linking step.</p><Action secondary onClick={()=>go("services")}>Browse services</Action></div>:<>
         <div className="detail-header"><div><small>Food establishment licence</small><h2>Cypress Cafe</h2><p>Licence {SAMPLE_LICENSE}</p></div><Badge tone={data.licenseSubmitted?"info":"warn"}>{data.licenseSubmitted?"Renewal submitted":"Renewal due"}</Badge></div>
         <dl className="details-grid"><div><dt>Licence holder</dt><dd>Maya Rivera · Cypress Cafe</dd></div><div><dt>Issued by</dt><dd>City-County Public Health</dd></div><div><dt>Expiration</dt><dd>December 31, 2030</dd></div><div><dt>Premises</dt><dd>22 Example Plaza, Watkins, CO 80137</dd></div><div><dt>Payment record</dt><dd>Finance and Procurement</dd></div><div><dt>Inspection</dt><dd>Annual review required</dd></div></dl>
         <section className="form-section"><h2>{data.licenseSubmitted?"Renewal status":"Renew this licence"}</h2>
           {data.licenseSubmitted?<div className="message-panel"><strong>Submitted for review</strong><p>Your simulated renewal request is recorded. Public Health must still review the licence and any inspection findings. No payment was processed.</p></div>:
           <form onSubmit={submitRenewal}><p>Check the details above before you submit. A new owner or changed business activity may require additional review.</p>
             <label className="checkbox-row"><input type="checkbox" checked={renewAcknowledged} onChange={e=>setRenewAcknowledged(e.target.checked)}/><span>I confirm that the licence holder and business activity shown above have not changed.</span></label>
             <p className="muted-small">No fee is collected in this demonstration. Submission does not renew or approve a licence.</p>
             <Action type="submit" disabled={!renewAcknowledged}>Submit renewal request</Action>
           </form>}
         </section>
       </>}
     </>}
     {page==="requests"&&<>
       <div className="page-intro"><h1>My service requests</h1><p>Track local issues reported to the city, or submit a new one.</p></div>
       <section className="section-block"><div className="section-heading"><h2>Reported issues</h2></div>
         {data.tickets.length?<div className="table-scroll"><table className="records-table"><thead><tr><th scope="col">Request</th><th scope="col">Issue</th><th scope="col">Reported</th><th scope="col">Status</th></tr></thead><tbody>
           {data.tickets.map(t=><tr key={t.id}><td><strong>{t.id}</strong></td><td>{t.category}<small>{t.description} · {t.location}</small></td><td>{dateFormat(t.created)}</td><td><Badge tone="info">{t.status}</Badge></td></tr>)}
         </tbody></table></div>:<p className="empty-state">You have no service requests.</p>}
       </section>
       <section className="form-section request-section"><h2>Report a problem</h2><form onSubmit={submitRequest}>
         <div className="form-field"><label htmlFor="problem-category">Type of problem</label><select id="problem-category" value={requestForm.category} onChange={e=>setRequestForm({...requestForm,category:e.target.value})}>
           <option>Street and sidewalk</option><option>Drainage or water on roads</option><option>Address or street sign</option><option>Park maintenance</option>
         </select></div>
         <TextInput id="request-location" label="Location" required value={requestForm.location} onChange={e=>setRequestForm({...requestForm,location:e.target.value})} helperText="A street, intersection or public place." />
         <div className="form-field"><label htmlFor="problem-description">Description</label><textarea id="problem-description" required rows={4} value={requestForm.description} onChange={e=>setRequestForm({...requestForm,description:e.target.value})}/></div>
         <Action type="submit">Submit service request</Action>
       </form></section>
     </>}
     {page==="service"&&<>
       <div className="page-intro"><button className="back-link" onClick={()=>go("home")}>← My services</button><h1>{current.title}</h1><p>{current.office}</p></div>
       {selected==="recreation"&&(sample?<><div className="detail-header"><div><small>City recreation pass</small><h2>Maya Rivera</h2><p>Pass REC-2030-2048</p></div><Badge tone="good">Active</Badge></div><dl className="details-grid"><div><dt>Pass holder</dt><dd>Maya Rivera</dd></div><div><dt>Valid through</dt><dd>March 31, 2031</dd></div><div><dt>Service</dt><dd>City recreation facilities</dd></div><div><dt>Issuing office</dt><dd>Parks, Recreation and Cultural Affairs</dd></div></dl><p className="muted-small">A demo account ID does not independently establish residency or programme eligibility.</p></>:<div className="empty-state"><h2>No pass linked</h2><p>There is no recreation pass in this new demo account. The city would need a separate application and eligibility check before issuing one.</p></div>)}
       {selected==="housing"&&(sample?<><div className="detail-header"><div><small>Local assistance · City Housing Division</small><h2>Housing assistance application</h2><p>Application HOU-2030-0371</p></div><Badge tone="info">In review</Badge></div><dl className="details-grid"><div><dt>Received</dt><dd>November 3, 2030</dd></div><div><dt>Responsible office</dt><dd>City Housing Division</dd></div><div><dt>Next step</dt><dd>Staff review of submitted documents</dd></div><div><dt>Housing Authority records</dt><dd>Not connected</dd></div></dl><div className="message-panel"><strong>Separate housing institutions</strong><p>The Regional Housing Authority has its own board and federal obligations. This city application does not show voucher status or provide access to the authority's records.</p></div>
       <div className="form-section"><h2>Referral to the Regional Housing Authority</h2><p>The city can record an interest in a referral. It cannot enroll you in another agency's programme or send records without a permitted process.</p><Action secondary disabled={data.referral} onClick={()=>{setData(prev=>({...prev,referral:true,activity:[addActivity("Housing referral interest recorded","City Housing Division"),...prev.activity]}));setNotice("Referral interest recorded in this demo; no records were sent.");}}>{data.referral?"Referral interest recorded":"Request referral information"}</Action></div></>:<div className="empty-state"><h2>No application</h2><p>No local housing application is attached to this new demo account.</p></div>)}
       {(selected==="library"||selected==="water")&&<><div className="detail-header"><div><small>{current.independent?"Independent public agency":"City-county service"}</small><h2>{current.title}</h2><p>{current.office}</p></div><Badge tone={tone(selected)}>{serviceStatus(selected)}</Badge></div>
         <div className="message-panel"><strong>Records remain with this agency</strong><p>The city account does not automatically access library borrowing history or utility balances. The agency must establish its own connection and information-sharing conditions.</p></div>
         <section className="form-section"><h2>Connect this service</h2><p>Record a request to link the service to your city account. This does not verify an account or authorize access to records.</p>
           <Action onClick={()=>connect(selected)} disabled={serviceStatus(selected)==="Connection requested"}>{serviceStatus(selected)==="Connection requested"?"Request recorded":"Request connection"}</Action>
         </section></>}
     </>}
     {page==="account"&&<>
       <div className="page-intro"><h1>Account and privacy</h1><p>Your city login profile and the records kept by individual services are separate.</p></div>
       <div className="account-columns"><section className="section-block"><h2>Profile</h2><dl className="detail-list"><div><dt>Name</dt><dd>{data.account.first} {data.account.last}</dd></div><div><dt>Account ID</dt><dd>{data.account.id}</dd></div><div><dt>Email</dt><dd>{data.account.email}</dd></div><div><dt>Address given</dt><dd>{data.account.address}, CO {data.account.postal}</dd></div><div><dt>Identity verification</dt><dd><Badge tone="warn">Not verified in demo</Badge></dd></div></dl>
         <div className="account-actions"><Action secondary onClick={()=>go("register")}>Create another demo account</Action><button className="text-link" onClick={restoreDemo}>Restore sample resident</button></div>
       </section>
       <aside className="privacy-panel"><h2>How information is used</h2><p>Your city account helps you reach participating services. It does not give each department access to all of your records.</p><p>A change here does not automatically update a library, housing, public health or utility record.</p><p>This application stores demonstration records in this browser only. It does not verify identity or transmit information to government systems.</p><button className="text-link" onClick={()=>saveDownload("east-detroit-demo-data.json",JSON.stringify(data,null,2))}>Download this browser's demo data ↗</button></aside></div>
       <section className="section-block"><div className="section-heading"><h2>Service connections</h2></div><div className="table-scroll"><table className="records-table"><thead><tr><th scope="col">Service</th><th scope="col">Record holder</th><th scope="col">Connection</th><th scope="col"><span className="visually-hidden">Action</span></th></tr></thead><tbody>
         {catalog.map(c=><tr key={c.key}><td><strong>{c.title}</strong></td><td>{c.office}</td><td><Badge tone={tone(c.key)}>{serviceStatus(c.key)}</Badge></td><td><button className="table-link" onClick={()=>openService(c.key)}>View <span aria-hidden="true">→</span></button></td></tr>)}
       </tbody></table></div></section>
       <section className="section-block"><div className="section-heading"><h2>Activity in this demo</h2></div><ol className="activity-list">{data.activity.map(a=><li key={a.id}><div><strong>{a.description}</strong><span>{a.office}</span></div><time>{dateFormat(a.date)}</time></li>)}</ol></section>
     </>}
     {page==="register"&&<>
       <div className="page-intro"><button className="back-link" onClick={()=>go("account")}>← Account and privacy</button><h1>Create a demo account</h1><p>Try the registration process for an East Detroit city account. No real identity check, email verification or government registration will occur.</p></div>
       <section className="form-section registration-section"><h2>Personal and contact information</h2><form onSubmit={submitSignup}>
         <div className="two-fields"><TextInput id="signup-first" label="First name" required value={signup.first} onChange={e=>setSignup({...signup,first:e.target.value})}/>
         <TextInput id="signup-last" label="Last name" required value={signup.last} onChange={e=>setSignup({...signup,last:e.target.value})}/></div>
         <TextInput id="signup-email" label="Email address" type="email" required value={signup.email} onChange={e=>setSignup({...signup,email:e.target.value})} helperText="Only saved in your browser. No confirmation email is sent."/>
         <TextInput id="signup-address" label="Street address" required value={signup.address} onChange={e=>setSignup({...signup,address:e.target.value})} helperText="Use an invented address for this demonstration."/>
         <div className="form-field"><label htmlFor="signup-postal">ZIP code</label><select id="signup-postal" value={signup.postal} onChange={e=>setSignup({...signup,postal:e.target.value})}><option>80137</option><option>80102</option><option>80018</option><option>80019</option></select><p className="field-help">A ZIP code alone does not establish city residency.</p></div>
         <label className="checkbox-row"><input type="checkbox" checked={signup.accepted} onChange={e=>setSignup({...signup,accepted:e.target.checked})}/><span>I understand this creates a fictional account ID for a classroom simulation, not an official credential.</span></label>
         <Action type="submit">Create demo account ID</Action>
       </form></section>
     </>}
     {notice&&<div className="toast-message" role="status"><span>{notice}</span><button onClick={()=>setNotice("")} aria-label="Dismiss message">Close</button></div>}
   </main>
   <footer className="page-footer"><div className="site-container"><strong>City and County of East Detroit</strong><span>Simulation for Public Mechanics · No live government services</span><a href="https://github.com/quarterback/field-school/tree/main/east-detroit/v3" target="_blank" rel="noreferrer">Scenario and references ↗</a></div></footer>
 </div>;
}
