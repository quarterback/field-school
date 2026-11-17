import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import "./east-detroit.css";


type Response = "proposed" | "agreed" | "conditional" | "declined" | "review";
type View = "overview" | "cases" | "agencies" | "exchanges" | "record" | "about";
type ResponseInfo = { status: Response; note: string; actor: string; updatedAt: string };
type DecisionEvent = { id: string; caseId: string; agency: string; actor: string; status: Response; note: string; at: string };
type Store = { choices: Record<string, ResponseInfo>; events: DecisionEvent[] };
type Agency = { id: string; name: string; type: "City-county" | "Independent" | "Community"; brief: string; records: string[] };
type Case = {
  id: string; label: string; short: string; topic: string; neighborhood: string; applicant: string;
  agency: string; receiver: string; authority: string; source: string; requester: string; fields: string[];
  notShared: string[]; premise: string; question: string; steps: string[];
};
const AGENCIES: Agency[] = [
  {id:"D-01",name:"Mayor / County Executive",type:"City-county",brief:"Directs municipal administration and presents service priorities.",records:["Administrative orders","Executive correspondence"]},
  {id:"D-02",name:"City-County Council",type:"City-county",brief:"Approves appropriations, ordinances and oversight.",records:["Budget decisions","Legislative records"]},
  {id:"D-03",name:"City Manager",type:"City-county",brief:"Coordinates operational delivery and staffing.",records:["Operations reports","Staffing plans"]},
  {id:"D-04",name:"Human Services",type:"City-county",brief:"Administers state-supervised programs under federal and state rules.",records:["Benefit cases","Application records"]},
  {id:"D-05",name:"City Housing Division",type:"City-county",brief:"Runs local housing assistance, prevention and development programs.",records:["Local assistance cases","Housing contracts"]},
  {id:"D-06",name:"Planning, Building & Land Use",type:"City-county",brief:"Manages zoning, development review and building plans.",records:["Permit files","Zoning and parcel plans"]},
  {id:"D-07",name:"Address Office & GIS",type:"City-county",brief:"Keeps municipal addresses, parcels and mapped service boundaries.",records:["Address registry","Parcel geometry","Boundary determinations"]},
  {id:"D-08",name:"Finance, Tax & Procurement",type:"City-county",brief:"Handles financial reporting, assessments, contracts and payment records.",records:["Payment status","Contracts","Financial records"]},
  {id:"D-09",name:"Digital Service & Records",type:"City-county",brief:"Maintains municipal software, records practices and access controls.",records:["Access logs","Service agreements"]},
  {id:"D-10",name:"Police, 911 & Emergency Management",type:"City-county",brief:"Handles law enforcement, dispatch and emergency planning.",records:["Incident reports","Dispatch logs"]},
  {id:"D-11",name:"Fire Department",type:"City-county",brief:"Runs fire suppression, prevention and first response.",records:["Fire inspections","Incident reports"]},
  {id:"D-12",name:"Public Health",type:"City-county",brief:"Runs public health programs and the retail-food licensing process.",records:["Food licenses","Inspection findings"]},
  {id:"D-13",name:"Parks, Recreation & Cultural Affairs",type:"City-county",brief:"Operates municipal recreation facilities and public programs.",records:["Recreation applications","Facility bookings"]},
  {id:"D-14",name:"Transportation & Public Works",type:"City-county",brief:"Maintains local streets and drainage systems.",records:["Street assets","Maintenance reports"]},
  {id:"D-15",name:"Clerk, Civil Rights & Appeals",type:"City-county",brief:"Maintains public records and supports review and appeal processes.",records:["Public records","Appeals"]},
  {id:"A-01",name:"Unified School District",type:"Independent",brief:"Controls school operations and student records through its own board.",records:["Enrollment","Student records"]},
  {id:"A-02",name:"Public Library District",type:"Independent",brief:"Runs libraries and retains its own patron records.",records:["Borrowing records","Library accounts"]},
  {id:"A-03",name:"Water & Sewer Authority",type:"Independent",brief:"Controls utility facilities, accounts and capacity decisions.",records:["Utility accounts","Service connections"]},
  {id:"A-04",name:"Regional Transportation District",type:"Independent",brief:"Controls regional transit routes, fares and rider information.",records:["Routes","Fares","Rider records"]},
  {id:"A-05",name:"State Human Services & IT",type:"Independent",brief:"Sets state program requirements and system access rules.",records:["State program policy","Access controls"]},
  {id:"A-06",name:"Regional Housing Authority",type:"Independent",brief:"Independently governs federal assistance and its own housing portfolio.",records:["Voucher status","Waitlists","Leases"]},
  {id:"A-07",name:"County Court",type:"Independent",brief:"Controls judicial cases and decisions separately from executive agencies.",records:["Court filings","Orders"]},
  {id:"A-08",name:"Health & Hospital Authority",type:"Independent",brief:"Governs the public safety-net hospital and clinical records.",records:["Clinical records","Admissions"]},
  {id:"A-09",name:"East Detroit Health System",type:"Independent",brief:"Optional independent Level I trauma and teaching hospital.",records:["Referrals","Clinical information"]},
  {id:"R-01",name:"Renter & Tenant Advocacy Council",type:"Community",brief:"Advocates for renters and residents facing housing barriers.",records:["Community concerns"]},
  {id:"R-02",name:"Old Watkins Landholders Alliance",type:"Community",brief:"Represents agricultural families and existing landholders.",records:["Community concerns"]},
  {id:"R-03",name:"Workers & Disability Access Coalition",type:"Community",brief:"Represents shift workers and residents who need accessible services.",records:["Access barriers"]},
];
const CASES: Case[] = [
  {id:"ED-101",label:"01 / Address & recreation",short:"Address verification",topic:"RESIDENCY / RECOVERY",neighborhood:"Inboden · 80137",applicant:"Resident ED-R047",agency:"D-13",receiver:"D-07",authority:"City-county verification",source:"Address Office & GIS",requester:"Parks, Recreation & Cultural Affairs",fields:["Parcel ID match","Inside municipal boundary?","Address match confidence"],notShared:["Property ownership history","Tax account","Other residents at address"],premise:"A resident applies for a recreation pass at a new Inboden address. The address registry cannot conclusively locate their parcel inside the city service boundary.",question:"What should Parks receive from GIS, and what happens when an address cannot be verified?",steps:["Recreation application","Municipal address check","Agency response","Parks review or decision"]},
  {id:"ED-204",label:"02 / Housing assistance",short:"Housing referral",topic:"INDEPENDENT AUTHORITY",neighborhood:"Colfax East · 80018",applicant:"Resident ED-R218",agency:"D-05",receiver:"A-06",authority:"Separate authority approval",source:"Regional Housing Authority",requester:"City Housing Division",fields:["Participation status","Referral eligibility indicator","Response expiration"],notShared:["Full income records","Voucher case notes","Rent payment history","Other household members"],premise:"A renter seeks help after an income disruption. The city can assess its own assistance program. An independent housing authority may already hold a relevant housing assistance record.",question:"Does the independent authority agree to a limited status check, and under what conditions?",steps:["City intake","Request limited housing fact","Authority response","City-only continuation or referral"]},
  {id:"ED-307",label:"03 / Food license renewal",short:"License renewal",topic:"PUBLIC HEALTH / FINANCE",neighborhood:"Watkins Junction · 80137",applicant:"Business ED-B116",agency:"D-12",receiver:"D-08",authority:"City-county financial record",source:"Finance, Tax & Procurement",requester:"Public Health",fields:["Annual license fee paid?","Payment reference","Payment date"],notShared:["Full business tax returns","Bank account number","Other taxpayer information"],premise:"An established restaurant renews its retail-food license. Public Health has the prior license and inspection records, but needs to confirm the renewal fee was received.",question:"Can payment status be reused without demanding another receipt, while retaining inspection review?",steps:["Existing license","Fee status verification","Public Health review","Renewal or correction notice"]},
];
const STATUS: Record<Response,{label:string;sub:string}> = {
  proposed:{label:"Proposed",sub:"No agency response recorded"},
  agreed:{label:"Agreed for simulation",sub:"A limited response is available in this demonstration"},
  conditional:{label:"Conditional",sub:"Agency requires conditions before releasing information"},
  declined:{label:"Declined",sub:"Agency will not supply the requested information"},
  review:{label:"Requires review",sub:"Records or authority require further checking"},
};
const INITIAL: Store={ choices:Object.fromEntries(CASES.map(c=>[c.id,{status:"proposed",note:"",actor:c.source,updatedAt:""}])),events:[] };

function Icon({name,size=19}: {name:string;size?:number}) {
  const common={width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round" as const,strokeLinejoin:"round" as const, "aria-hidden":true as const};
  const paths:Record<string,ReactNode>={
    grid:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    folder:<><path d="M3 7h7l2 2h9v11H3z"/><path d="M3 7V4h7l2 3"/></>,
    building:<><rect x="4" y="3" width="16" height="18"/><path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-4h4v4"/></>,
    exchange:<><path d="M4 7h16m-5-4 5 4-5 4M20 17H4m5-4-5 4 5 4"/></>,
    log:<><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
    arrow:<path d="M5 12h14m-6-6 6 6-6 6"/>,
    down:<path d="m6 9 6 6 6-6"/>,
    back:<path d="m15 18-6-6 6-6"/>,
    download:<><path d="M12 3v12m-4-4 4 4 4-4"/><path d="M4 17v4h16v-4"/></>,
    refresh:<><path d="M4 12a8 8 0 0 1 14-5l2 2M20 3v6h-6M20 12a8 8 0 0 1-14 5l-2-2M4 21v-6h6"/></>,
    check:<path d="m4 12 5 5L20 6"/>,
    close:<path d="M6 6l12 12M18 6 6 18"/>,
    search:<><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
    time:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    shield:<><path d="M12 2 4 5v7c0 5 4 8 8 10 4-2 8-5 8-10V5z"/><path d="m9 12 2 2 4-4"/></>,
    menu:<path d="M4 6h16M4 12h16M4 18h16"/>,
  };
  return <svg {...common}>{paths[name]??paths.info}</svg>;
}
function saveFile(name:string,content:string,type:string){
  const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement("a");a.href=url;a.download=name;a.click();window.setTimeout(()=>URL.revokeObjectURL(url),500);
}
function outcome(c:Case,s:Response){
 if(c.id==="ED-101")return ({proposed:"Address check awaiting GIS response. Parks has not decided pass eligibility.",agreed:"GIS confirms the municipal boundary. Parks can complete its eligibility review.",conditional:"GIS can supply a provisional location only. Parks must decide whether limited access is permitted.",declined:"No municipal boundary result available. Parks keeps the application open for manual review.",review:"GIS has flagged a disputed parcel. The case remains open under the original number."})[s];
 if(c.id==="ED-204")return ({proposed:"City assistance intake can proceed. The authority has not responded to the proposed status request.",agreed:"The authority supplies only the agreed status fields. City staff still decide city assistance separately.",conditional:"A restricted response is possible after the authority's conditions are met; city intake continues meanwhile.",declined:"No housing authority information is released. The city continues its own intake and offers a resident-directed referral.",review:"The authority has not established a permitted disclosure. City staff may continue local assistance assessment."})[s];
 return ({proposed:"Renewal awaits fee verification. Public Health keeps responsibility for inspection and licensing.",agreed:"Finance confirms the fee. Public Health still reviews inspection status and ownership changes.",conditional:"Finance requires a payment reference or reconciliation before reporting a verified status.",declined:"Finance does not provide the status. Staff must use an alternative payment verification route.",review:"Payment details need reconciliation. The existing license remains under review."})[s];
}
const clock=(date:string)=>{try{return new Date(date).toLocaleString(undefined,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return date}};
function EastDetroit(){
 const [view,setView]=useState<View>("overview");
 const [caseId,setCaseId]=useState("ED-101");
 const [store,setStore]=useState<Store>(INITIAL);
 const [ready,setReady]=useState(false);
 const [agencyFilter,setAgencyFilter]=useState("All");
 const [query,setQuery]=useState("");
 const [draftStatus,setDraftStatus]=useState<Response>("proposed");
 const [draftNote,setDraftNote]=useState("");
 const [draftActor,setDraftActor]=useState("");
 const [notice,setNotice]=useState("");
 const [mobileNav,setMobileNav]=useState(false);
 const [resetAsk,setResetAsk]=useState(false);
 const active=CASES.find(c=>c.id===caseId)??CASES[0];
 const choice=store.choices[caseId]??INITIAL.choices[caseId];
 const activeAgency=AGENCIES.find(a=>a.id===active.receiver);
 useEffect(()=>{try{const raw=window.localStorage.getItem("east-detroit-sim-v1");if(raw){const parsed=JSON.parse(raw) as Store;if(parsed.choices&&Array.isArray(parsed.events))setStore(parsed)}}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)window.localStorage.setItem("east-detroit-sim-v1",JSON.stringify(store))},[store,ready]);
 useEffect(()=>{setDraftStatus(choice.status);setDraftNote(choice.note);setDraftActor(choice.actor);setNotice("")},[caseId,choice.updatedAt]);
 const counts=useMemo(()=>({active:CASES.filter(c=>store.choices[c.id]?.status!=="proposed").length,conditional:CASES.filter(c=>store.choices[c.id]?.status==="conditional").length,declined:CASES.filter(c=>store.choices[c.id]?.status==="declined").length}),[store]);
 const navItems:{id:View;label:string;icon:string}[]=[{id:"overview",label:"Overview",icon:"grid"},{id:"cases",label:"Service cases",icon:"folder"},{id:"agencies",label:"Agency register",icon:"building"},{id:"exchanges",label:"Data exchanges",icon:"exchange"},{id:"record",label:"Decision record",icon:"log"},{id:"about",label:"About this system",icon:"info"}];
 const navigate=(id:View)=>{setView(id);setMobileNav(false);setNotice("")};
 const openCase=(id:string)=>{setCaseId(id);navigate("cases")};
 function recordDecision(){
   if(draftStatus==="proposed"){setNotice("Choose an agency response before recording a decision.");return;}
   if(!draftActor.trim()){setNotice("Name the agency or presenter entering the response.");return;}
   if((draftStatus==="conditional"||draftStatus==="declined"||draftStatus==="review")&&!draftNote.trim()){setNotice("Add a reason or condition for this agency response.");return;}
   const at=new Date().toISOString();const entry:ResponseInfo={status:draftStatus,note:draftNote.trim(),actor:draftActor.trim(),updatedAt:at};
   const event:DecisionEvent={id:"EV-"+Math.random().toString(36).slice(2,9).toUpperCase(),caseId,agency:active.source,actor:entry.actor,status:draftStatus,note:entry.note,at};
   setStore(prev=>({choices:{...prev.choices,[caseId]:entry},events:[event,...prev.events]}));
   setNotice("Agency response recorded for this local session.");
 }
 function reset(){setStore({choices:Object.fromEntries(CASES.map(c=>[c.id,{...INITIAL.choices[c.id]}])),events:[]});setResetAsk(false);setNotice("The simulation has been reset.");}
 function exportJSON(){saveFile("east-detroit-session.json",JSON.stringify({scenario:"East Detroit 2030",exportedAt:new Date().toISOString(),...store},null,2),"application/json");}
 function exportMD(){const lines=["# East Detroit simulation decisions","",`Exported: ${new Date().toISOString()}`,"","This is a local classroom simulation record, not an agency agreement.","",...store.events.map(e=>`## ${e.caseId} — ${STATUS[e.status].label}\n- When: ${e.at}\n- Represented by: ${e.actor}\n- Agency: ${e.agency}\n- Conditions / reasons: ${e.note||"None recorded"}\n- Result: ${outcome(CASES.find(c=>c.id===e.caseId)!,e.status)}\n`)];saveFile("east-detroit-decisions.md",lines.join("\n"),"text/markdown");}
 const filtered=AGENCIES.filter(a=>(agencyFilter==="All"||a.type===agencyFilter)&&(a.name+" "+a.id+" "+a.brief).toLowerCase().includes(query.toLowerCase()));
 return <div className="ed-app">
   <a className="ed-skip" href="#main">Skip to main content</a>
   <div className="ed-utility"><span>PUBLIC MECHANICS <span className="ed-utility-dot">●</span> CITY & COUNTY OF EAST DETROIT</span><span>COLORADO · 2030 <span className="ed-slash">/</span> DEMONSTRATION ENVIRONMENT</span></div>
   <header className="ed-mobile-header"><button className="ed-icon-button" aria-label="Toggle navigation" aria-expanded={mobileNav} onClick={()=>setMobileNav(!mobileNav)}><Icon name="menu"/></button><strong>ED / PUBLIC SYSTEMS</strong><span className="ed-live-dot" aria-hidden="true"/></header>
   <div className="ed-layout">
    <aside className={"ed-sidebar "+(mobileNav?"ed-sidebar-open":"")} aria-label="Main navigation">
      <div className="ed-brand"><div className="ed-brand-mark" aria-hidden="true"><span>E</span><span>D</span></div><div><div className="ed-brand-name">EAST<br/>DETROIT</div><div className="ed-brand-sub">MUNICIPAL SYSTEMS / 2030</div></div></div>
      <div className="ed-sidebar-label">WORKSPACE <span>01–06</span></div>
      <nav className="ed-nav" aria-label="Sections">{navItems.map((n,i)=><button key={n.id} className={"ed-nav-item "+(view===n.id?"current":"")} aria-current={view===n.id?"page":undefined} onClick={()=>navigate(n.id)}><span className="ed-nav-icon"><Icon name={n.icon}/></span><span>{n.label}</span><small>{String(i+1).padStart(2,"0")}</small></button>)}</nav>
      <div className="ed-sidebar-base"><div className="ed-sidebar-base-tag">LIVE COMMISSIONING LAB</div><p>One city. Many records.<br/>Separate decision rights.</p><div className="ed-sidebar-foot"><span className="ed-small-ring"/> SIMULATED DATA ONLY</div></div>
      <div className="ed-sidebar-bottom"><div>ED / 2030.1</div><div>LOCAL SESSION</div></div>
    </aside>
    <main className="ed-main" id="main">
      <div className="ed-main-head"><div className="ed-breadcrumb">EAST DETROIT <span> / </span> PUBLIC OPERATIONS <span> / </span> <strong>{navItems.find(n=>n.id===view)?.label.toUpperCase()}</strong></div><div className="ed-breadcrumb-right"><span className="ed-small-ring"/> CLASSROOM SIMULATION <span className="ed-breadcrumb-date">NOV 2026</span></div></div>
      {view==="overview"&&<div className="ed-page ed-overview">
        <div className="ed-eyebrow"><span className="ed-square"/> MUNICIPAL SERVICE WORKBENCH <span className="ed-eyebrow-line"/></div>
        <h1 className="ed-hero-title">Shared service.<br/><em>Separate authority.</em></h1>
        <p className="ed-hero-deck">Explore how East Detroit's agencies exchange information, apply their own rules, and decide what a shared public service can do.</p>
        <div className="ed-city-strip"><div><strong>382,417</strong><span>RESIDENTS</span></div><div><strong>20</strong><span>NEIGHBORHOODS</span></div><div><strong>27</strong><span>ROSTER ENTRIES</span></div><div><strong>03</strong><span>WORKING CASES</span></div></div>
        <div className="ed-section-head"><div><span className="ed-index">01 / </span><h2>Cases on the table</h2></div><p>SELECT A CASE TO OPEN THE LIVE DEMONSTRATION</p></div>
        <div className="ed-case-grid">{CASES.map((c,i)=><button key={c.id} className={"ed-case-card ed-case-tone-"+i} onClick={()=>openCase(c.id)}><div className="ed-case-top"><span>{c.id} <span aria-hidden="true">/</span> {c.topic}</span><Icon name="arrow" size={24}/></div><div className="ed-case-name">{c.short}</div><p>{c.question}</p><div className="ed-case-bottom"><span className={"ed-status-pill ed-status-"+store.choices[c.id]?.status}>{STATUS[store.choices[c.id]?.status||"proposed"].label}</span><span>OPEN CASE <Icon name="arrow" size={15}/></span></div></button>)}</div>
        <div className="ed-overview-bottom"><div className="ed-policy-note"><span className="ed-note-star">✳</span><div><strong>Agency authority comes first.</strong><p>A demonstrated exchange is a proposal until the responsible agency defines its limits and gives its response.</p></div></div><div className="ed-recent"><span className="ed-kicker">SESSION STATE</span><strong>{counts.active} / 3</strong><span>cases with recorded responses</span><button className="ed-inline-link" onClick={()=>navigate("record")}>View decision record <Icon name="arrow" size={16}/></button></div></div>
      </div>}
      {view==="cases"&&<div className="ed-page ed-case-page">
        <div className="ed-eyebrow"><span className="ed-square"/> PROTOTYPE / LIVE CASE <span className="ed-eyebrow-line"/></div>
        <div className="ed-case-header"><div><div className="ed-case-index">SERVICE CASE {active.id} <span>—</span> {active.topic}</div><h1>{active.short}<span className="ed-period">.</span></h1><p>SIMULATED · {active.neighborhood} · {active.applicant}</p></div><div className={"ed-case-status ed-status-"+choice.status}><span className="ed-status-ping"/> {STATUS[choice.status].label}</div></div>
        <div className="ed-case-switch" role="group" aria-label="Choose demonstration case">{CASES.map(c=><button key={c.id} className={caseId===c.id?"selected":""} onClick={()=>setCaseId(c.id)} aria-pressed={caseId===c.id}><span>{c.id}</span>{c.short}</button>)}</div>
        <div className="ed-workspace-grid">
          <section className="ed-case-left" aria-labelledby="case-context">
            <div className="ed-panel-label"><span>01</span><h2 id="case-context">The situation</h2><span>REFERENCE / SYNTHETIC</span></div>
            <div className="ed-situation">{active.premise}</div>
            <div className="ed-transaction">
              <div className="ed-panel-label"><span>02</span><h2>Proposed exchange</h2><span>NOT YET AUTHORIZED</span></div>
              <div className="ed-agency-transfer"><div><small>REQUESTING AGENCY</small><strong>{active.requester}</strong><span>{active.agency} · CITY-COUNTY</span></div><div className="ed-transfer-arrow"><Icon name="arrow" size={25}/></div><div><small>RECORD HOLDER</small><strong>{active.source}</strong><span>{active.receiver} · {active.receiver.startsWith("A-")?"INDEPENDENT":"CITY-COUNTY"}</span></div></div>
              <div className="ed-fields"><div><div className="ed-fields-label">FIELDS REQUESTED</div>{active.fields.map(f=><div key={f} className="ed-field"><span className="ed-field-dot"/> {f}</div>)}</div><div><div className="ed-fields-label">NOT REQUESTED / NOT SHARED</div>{active.notShared.map(f=><div key={f} className="ed-field ed-field-off"><span className="ed-field-minus">—</span> {f}</div>)}</div></div>
              <div className="ed-auth-note"><Icon name="shield" size={19}/><span>{active.authority}. The software cannot give itself permission to disclose information.</span></div>
            </div>
            <div className="ed-workflow"><div className="ed-panel-label"><span>03</span><h2>Workflow effect</h2><span>UPDATED WITH RESPONSE</span></div><div className="ed-steps">{active.steps.map((step,i)=><div className="ed-step" key={step}><span>{String(i+1).padStart(2,"0")}</span><p>{step}</p></div>)}</div><div className={"ed-outcome ed-outcome-"+choice.status} aria-live="polite"><strong>{choice.status==="proposed"?"AWAITING AGENCY POSITION":"CURRENT SIMULATION RESULT"}</strong><p>{outcome(active,choice.status)}</p>{choice.note&&<div className="ed-outcome-note"><b>Agency note:</b> {choice.note}</div>}</div></div>
          </section>
          <aside className="ed-control-panel" aria-label="Agency response form">
            <div className="ed-control-eyebrow">04 / AGENCY RESPONSE</div><h2>Set the boundary<span>.</span></h2><p className="ed-control-intro">{active.question}</p>
            <div className="ed-agency-caption">RESPONDING FOR</div><div className="ed-control-agency"><span className="ed-control-letter">{active.receiver}</span><strong>{activeAgency?.name}</strong></div>
            <fieldset className="ed-response-options"><legend>What does this agency say?</legend>{(["agreed","conditional","declined","review"] as Response[]).map(status=><label key={status} className={"ed-radio-card "+(draftStatus===status?"chosen":"")}><input type="radio" name="response" value={status} checked={draftStatus===status} onChange={()=>setDraftStatus(status)}/><span className="ed-radio-visual" aria-hidden="true"/><span><strong>{STATUS[status].label}</strong><small>{STATUS[status].sub}</small></span></label>)}</fieldset>
            <div className="ed-form-field"><label htmlFor="actor">Agency or presenter entering the response</label><input id="actor" value={draftActor} onChange={e=>setDraftActor(e.target.value)} placeholder={active.source}/></div>
            <div className="ed-form-field"><label htmlFor="responseNote">Reason, conditions, or questions <span>{["conditional","declined","review"].includes(draftStatus)?"(required)":"(optional)"}</span></label><textarea id="responseNote" rows={3} value={draftNote} onChange={e=>setDraftNote(e.target.value)} placeholder="What can be shared? What must change? Who needs to approve?"/></div>
            <button className="ed-save-button" onClick={recordDecision}><span>Record agency position</span><Icon name="arrow" size={20}/></button>
            {notice&&<div className="ed-inline-notice" role="status">{notice}</div>}
            <p className="ed-control-footnote">This records a position for the classroom simulation. It does not authorize an actual agreement.</p>
          </aside>
        </div>
        <div className="ed-history-panel"><div className="ed-section-head"><div><span className="ed-index">05 / </span><h2>Case activity</h2></div><button className="ed-inline-link" onClick={()=>navigate("record")}>Full decision record <Icon name="arrow" size={15}/></button></div>{store.events.filter(e=>e.caseId===caseId).length?store.events.filter(e=>e.caseId===caseId).map(e=><div className="ed-event-row" key={e.id}><div>{clock(e.at)}</div><strong>{STATUS[e.status].label}</strong><span>{e.actor}{e.note?" — "+e.note:""}</span></div>):<div className="ed-empty-small">No agency response has been entered for this case. Select a response to begin.</div>}</div>
      </div>}
      {view==="agencies"&&<div className="ed-page ed-register-page"><div className="ed-eyebrow"><span className="ed-square"/> INSTITUTIONAL DIRECTORY <span className="ed-eyebrow-line"/></div><h1>Agency register<span className="ed-period">.</span></h1><p className="ed-page-lead">The city can direct its own departments to participate in planning. Independent bodies retain their authority over participation and records.</p>
        <div className="ed-register-tools"><div className="ed-search"><Icon name="search"/><label className="ed-visually-hidden" htmlFor="agencySearch">Search agencies</label><input id="agencySearch" placeholder="Search by agency, role or record…" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="ed-filters" role="group" aria-label="Agency type">{["All","City-county","Independent","Community"].map(f=><button key={f} className={agencyFilter===f?"selected":""} onClick={()=>setAgencyFilter(f)} aria-pressed={agencyFilter===f}>{f}</button>)}</div></div>
        <div className="ed-register-summary">{filtered.length} OF {AGENCIES.length} ENTRIES <span> /  FIXED CITY ROSTER</span></div>
        <div className="ed-agency-list">{filtered.map(a=><article key={a.id} className="ed-agency-row"><div className="ed-agency-id">{a.id}</div><div><div className="ed-agency-row-title">{a.name}</div><p>{a.brief}</p><div className="ed-record-tags">{a.records.map(x=><span key={x}>{x}</span>)}</div></div><div className={"ed-agency-badge ed-type-"+a.type.toLowerCase()}>{a.type}</div></article>)}</div>
      </div>}
      {view==="exchanges"&&<div className="ed-page ed-register-page"><div className="ed-eyebrow"><span className="ed-square"/> REQUEST REGISTER <span className="ed-eyebrow-line"/></div><h1>Information requests<span className="ed-period">.</span></h1><p className="ed-page-lead">A proposed exchange is a question to the agency that holds the record. Select a request to inspect its fields and record a response.</p><div className="ed-request-list">{CASES.map((c,i)=><article className="ed-request-card" key={c.id}><div className="ed-request-side"><span>{String(i+1).padStart(2,"0")}</span><Icon name="exchange" size={28}/></div><div className="ed-request-main"><div className="ed-request-top"><span>{c.id} / REQUEST</span><span className={"ed-status-pill ed-status-"+store.choices[c.id]?.status}>{STATUS[store.choices[c.id]?.status??"proposed"].label}</span></div><h2>{c.requester} <span>→</span> {c.source}</h2><p><strong>Purpose:</strong> {c.question}</p><div className="ed-request-fields"><span>REQUESTED: {c.fields.join(" · ")}</span></div><button className="ed-text-action" onClick={()=>openCase(c.id)}>Open request <Icon name="arrow" size={17}/></button></div></article>)}</div></div>}
      {view==="record"&&<div className="ed-page ed-register-page"><div className="ed-eyebrow"><span className="ed-square"/> SESSION HISTORY <span className="ed-eyebrow-line"/></div><div className="ed-record-head"><div><h1>Decision record<span className="ed-period">.</span></h1><p className="ed-page-lead">A local, chronological account of agency positions entered during this simulation. Earlier responses are retained when revised.</p></div><div className="ed-record-actions"><button className="ed-button-outline" onClick={exportMD}><Icon name="download" size={16}/> Export Markdown</button><button className="ed-button-solid" onClick={exportJSON}><Icon name="download" size={16}/> Export JSON</button></div></div>
      <div className="ed-record-stats"><div><strong>{store.events.length}</strong><span>RECORDED EVENTS</span></div><div><strong>{counts.active}</strong><span>CASES WITH RESPONSE</span></div><div><strong>{counts.conditional+counts.declined}</strong><span>CONDITIONS / REFUSALS</span></div></div>
      <div className="ed-log-list">{store.events.length?store.events.map(e=><article className="ed-log-entry" key={e.id}><div className="ed-log-top"><span>{e.caseId} / {clock(e.at)}</span><span className={"ed-status-pill ed-status-"+e.status}>{STATUS[e.status].label}</span></div><h2>{e.agency}</h2><p><b>Recorded by</b> {e.actor}</p><p><b>Agency position</b> {e.note||"Limited simulated exchange accepted without additional conditions."}</p><p><b>Workflow consequence</b> {outcome(CASES.find(c=>c.id===e.caseId)!,e.status)}</p><button className="ed-text-action" onClick={()=>openCase(e.caseId)}>Inspect case <Icon name="arrow" size={17}/></button></article>):<div className="ed-empty-record"><Icon name="log" size={36}/><h2>No agency positions recorded yet.</h2><p>Open a case, select an agency response and record it. Decisions will appear here.</p><button className="ed-button-solid" onClick={()=>openCase("ED-101")}>Open first case <Icon name="arrow"/></button></div>}</div>
      <div className="ed-reset-area"><button className="ed-button-outline" onClick={()=>setResetAsk(true)}><Icon name="refresh" size={16}/> Reset simulation</button><span>Changes are saved only in this browser. They are not shared with classmates.</span></div></div>}
      {view==="about"&&<div className="ed-page ed-about"><div className="ed-eyebrow"><span className="ed-square"/> MODEL & SOURCES <span className="ed-eyebrow-line"/></div><h1>About the workbench<span className="ed-period">.</span></h1><p className="ed-page-lead">This software is a synthetic demonstration of interagency information exchange for the University of Michigan Public Mechanics seminar.</p>
      <div className="ed-about-grid"><section><h2>What is real</h2><p>The city uses the real geography near Watkins, the Colorado Air and Space Port and Denver. State/local governance and the referenced Detroit, Home Forward, Estonia and Colorado case studies provide researched precedents.</p></section><section><h2>What is simulated</h2><p>East Detroit's municipal identity, 2030 population, institutions, all case records, sample requests and recorded agency positions are classroom fiction. No actual government information or agreements are involved.</p></section><section><h2>Who decides</h2><p>Individual agencies keep their records and legal powers. A vendor demonstration cannot authorize an exchange, issue a benefit or make a legal decision. A response in the app changes only the simulated workflow.</p></section><section><h2>Session storage</h2><p>Positions are stored locally in this browser and can be exported. Refreshing normally retains them; clearing browser storage removes them. No account or shared server is included in this version.</p></section></div>
      <div className="ed-sources"><h2>Project references</h2><a target="_blank" rel="noreferrer" href="https://github.com/quarterback/field-school/blob/main/east-detroit/v3/master_project_dossier_v3.md">City dossier and roster <Icon name="arrow" size={15}/></a><a target="_blank" rel="noreferrer" href="https://github.com/quarterback/field-school/blob/main/east-detroit/v3/municipal_digital_governance_packet_v3.md">Governance and X-tee comparison <Icon name="arrow" size={15}/></a><a target="_blank" rel="noreferrer" href="https://github.com/quarterback/field-school/blob/main/east-detroit/v3/housing_authority_case_home_forward_vs_detroit.md">Housing: Detroit and Home Forward <Icon name="arrow" size={15}/></a><a target="_blank" rel="noreferrer" href="https://hds.hel.fi/">Helsinki Design System reference <Icon name="arrow" size={15}/></a><a target="_blank" rel="noreferrer" href="https://github.com/quarterback/field-school/blob/main/east-detroit/prototype/DESIGN_SPEC.md">Prototype requirements <Icon name="arrow" size={15}/></a></div>
      </div>}
      <footer className="ed-footer"><span>ED / EAST DETROIT MUNICIPAL OPERATIONS</span><span>DESIGN PROPOSAL · 2030.1 · NO LIVE GOVERNMENT RECORDS</span></footer>
    </main>
   </div>
   {resetAsk&&<div className="ed-modal-shade" role="presentation" onClick={()=>setResetAsk(false)}><div className="ed-dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title" onClick={e=>e.stopPropagation()}><h2 id="reset-title">Reset this session?</h2><p>This will delete all locally recorded agency positions and decision history from this browser. Export your decisions first if you want to keep them.</p><div><button className="ed-button-outline" onClick={()=>setResetAsk(false)}>Cancel</button><button className="ed-button-solid" onClick={reset}>Reset session</button></div></div></div>}
  </div>;
}

export default EastDetroit;
