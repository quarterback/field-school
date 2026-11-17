import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button, ButtonVariant, TextInput } from "hds-react";
import { ParksService, HousingService, LibraryService, WaterService } from "./ServicePanels";
import type { Reservation } from "./ServicePanels";
import { TransitService } from "./TransitPanel";
import type { FareProduct } from "./TransitPanel";
import { SchoolDistrictService, RegionalHousingService, LimitedService } from "./PartnerPanels";
import { DemoTour, DEMO_STOPS } from "./DemoTour";
import { DEMO_RESIDENTS, hasResidentService, residentRecords, getDemoResident } from "./DemoResidents";
import { LIFE_EVENT_SEED, isLicenseRenewed, ProactiveHome, HouseholdSection, FamilyService, RenewalRecord } from "./ProactiveServices";
import type { LifeEventState } from "./ProactiveServices";
import "./east-detroit.css";

type Page = "home" | "services" | "license" | "requests" | "account" | "register" | "service";
type ServiceKey = "recreation" | "license" | "housing" | "library" | "water" | "requests" | "transit" | "school" | "authority" | "state" | "court" | "hospital" | "family";
type Account = { id: string; first: string; last: string; email: string; address: string; postal: string; created: string };
type Ticket = { id: string; category: string; description: string; location: string; created: string; status: string };
type Activity = { id: string; date: string; description: string; office: string };
type Portal = {
  account: Account;
  licenseSubmitted: boolean;
  reservations: Reservation[];
  housingMessage: string;
  libraryRenewed: boolean;
  waterIssue: string;
  transitBalanceCents: number;
  transitPasses: FareProduct[];
  schoolLetterRequested: boolean;
  authorityFollowupRequested: boolean;
  lifeEvent: LifeEventState;
  tickets: Ticket[];
  activity: Activity[];
};
const KEY = "east-detroit-resident-portal-v4";
const sampleAccount: Account = {
  id: "ED-2030-00482", first: "Maya", last: "Rivera", email: "maya.rivera@example.org",
  address: "14 Example Lane, Old Watkins", postal: "80137", created: "2030-09-11",
};
const initial: Portal = {
  account: sampleAccount, licenseSubmitted: false, reservations: [], housingMessage: "", libraryRenewed: false, waterIssue: "", transitBalanceCents: 1425, transitPasses: [], schoolLetterRequested:false, authorityFollowupRequested:false, lifeEvent:{...LIFE_EVENT_SEED},
  tickets: [{ id: "SR-2030-1048", category: "Street and sidewalk", description: "Streetlight outside the community center is out.", location: "Old Watkins", created: "2030-11-07", status: "In progress" }],
  activity: [
    { id: "ACT-02", date: "2030-11-09", description: "Recreation pass issued", office: "Parks and Recreation" },
    { id: "ACT-01", date: "2030-11-07", description: "Service request SR-2030-1048 received", office: "Public Works" },
  ],
};

type ProfileStore = { active: string; profiles: Record<string,Portal> };
const FIRST_KEY = "maya";
const RESIDENT_SEED: ProfileStore = {
  active: FIRST_KEY,
  profiles: {
    maya: initial,
    avery: {
      ...initial,
      account: DEMO_RESIDENTS[1].account,
      licenseSubmitted: false,
      reservations: [],
      housingMessage: "",
      libraryRenewed: false,
      waterIssue: "",
      transitBalanceCents: 825,
      transitPasses: [],
      schoolLetterRequested: false,
      authorityFollowupRequested: false,
      tickets: [
        {id:"SR-2030-1159",category:"Street and sidewalk",description:"Crosswalk signal near Central Station does not respond.",location:"Watkins Junction",created:"2030-11-08",status:"Received"},
      ],
      activity: [
        {id:"ACT-AV-2",date:"2030-11-10",description:"Transit fare account updated",office:"Regional Transportation District"},
        {id:"ACT-AV-1",date:"2030-11-08",description:"Service request SR-2030-1159 received",office:"Public Works"},
      ],
    },
    helen: {
      ...initial,
      account: DEMO_RESIDENTS[2].account,
      licenseSubmitted: false,
      reservations: [],
      housingMessage: "",
      libraryRenewed: false,
      waterIssue: "",
      transitBalanceCents: 0,
      transitPasses: [],
      schoolLetterRequested: false,
      authorityFollowupRequested: false,
      tickets: [
        {id:"SR-2030-0816",category:"Park maintenance",description:"Damaged bench beside the trail entrance.",location:"Old Watkins",created:"2030-11-06",status:"In progress"},
      ],
      activity: [
        {id:"ACT-HE-2",date:"2030-11-12",description:"Water bill issued",office:"Water and Sewer Authority"},
        {id:"ACT-HE-1",date:"2030-11-06",description:"Service request SR-2030-0816 received",office:"Public Works"},
      ],
    },
    samira: {
      ...initial,
      account: DEMO_RESIDENTS[3].account,
      licenseSubmitted:false,
      transitBalanceCents:0,
      transitPasses:[],
      schoolLetterRequested:false,
      authorityFollowupRequested:false,
      tickets:[],
      activity:[
        {id:"ACT-SA-2",date:"2030-11-13",description:"Newborn coverage confirmed by state Human Services",office:"State Human Services"},
        {id:"ACT-SA-1",date:"2030-11-12",description:"Birth registered for Lucia Ortiz",office:"County Clerk / Vital Records"},
      ],
      lifeEvent:{...LIFE_EVENT_SEED},
    },
  },
};
function initialStore():ProfileStore {
  const profiles={...RESIDENT_SEED.profiles};
  if(typeof window==="undefined")return {active:FIRST_KEY,profiles};
  try {
    const saved=window.localStorage.getItem(KEY)||window.localStorage.getItem("east-detroit-resident-portal-v3");
    if(saved){
      const parsed=JSON.parse(saved) as ProfileStore;
      if(parsed?.profiles&&typeof parsed.profiles==="object"){
        const restored={...profiles};
        for(const [key,value] of Object.entries(parsed.profiles)){
          if(value?.account?.id && Array.isArray(value?.tickets) && Array.isArray(value?.activity)) restored[key]={...value,lifeEvent:value.lifeEvent||{...LIFE_EVENT_SEED}};
        }
        return {active:restored[parsed.active]?parsed.active:FIRST_KEY,profiles:restored};
      }
    }
    const legacy=window.localStorage.getItem("east-detroit-resident-portal-v2");
    if(legacy){
      const old=JSON.parse(legacy) as Portal;
      if(old?.account?.id && Array.isArray(old.tickets)&&Array.isArray(old.activity)){
        if(old.account.id===initial.account.id)profiles.maya={...initial,...old};
        else{
          profiles[old.account.id]={...initial,...old};
          return {active:old.account.id,profiles};
        }
      }
    }
  }catch{/* Browser storage is optional. */}
  return {active:FIRST_KEY,profiles};
}

const catalog: {key:ServiceKey;title:string;office:string;description:string;independent:boolean}[] = [
  {key:"recreation",title:"Recreation and facilities",office:"Parks, Recreation and Cultural Affairs",description:"View your pass, book a facility and manage reservations.",independent:false},
  {key:"license",title:"Business licenses and permits",office:"Public Health · Finance",description:"Review a license, inspection record and renewal.",independent:false},
  {key:"housing",title:"Housing assistance",office:"City Housing Division",description:"View an application, supporting records and messages.",independent:false},
  {key:"family",title:"Family and children",office:"County Clerk · Human Services",description:"View household records, newborn coverage and family offers.",independent:false},
  {key:"requests",title:"Service requests",office:"Transportation and Public Works",description:"Report and track street, drainage and park maintenance issues.",independent:false},
  {key:"library",title:"Library card and loans",office:"East Detroit Public Library District",description:"View your library card and checked-out materials.",independent:true},
  {key:"water",title:"Water and sewer",office:"East Detroit Water and Sewer Authority",description:"View utility bills, service details and billing inquiries.",independent:true},
  {key:"transit",title:"Regional transit (RTD)",office:"Regional Transportation District (RTD)",description:"Manage your MyRide fare account, tickets, and trip planning.",independent:true},
  {key:"school",title:"Student enrollment",office:"East Detroit Unified School District",description:"View a household enrollment record and request a verification letter.",independent:true},
  {key:"authority",title:"Regional housing authority",office:"East Detroit Regional Housing Authority",description:"Review a separate housing authority inquiry.",independent:true},
  {key:"state",title:"State benefit services",office:"State of Colorado Human Services and State IT",description:"State-supervised benefits and eligibility systems.",independent:true},
  {key:"court",title:"County Court services",office:"East Detroit County Court",description:"Court services governed under judicial authority.",independent:true},
  {key:"hospital",title:"Hospital and patient services",office:"East Detroit Health and Hospital Authority",description:"Public hospital services and separately held clinical records.",independent:true},
];
const SAMPLE_LICENSE = "FOOD-2030-0184";
function makeId(prefix:string) {
  return prefix + Math.floor(1000 + Math.random()*9000).toString();
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
    variant={secondary?ButtonVariant.Secondary:ButtonVariant.Primary}
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
 const [profileStore,setProfileStore]=useState<ProfileStore>(initialStore);
 const data=profileStore.profiles[profileStore.active]||initial;
 const record=residentRecords(profileStore.active);
 const hasRecord=(key:ServiceKey)=>hasResidentService(profileStore.active,key);
 function setData(next:Portal|((previous:Portal)=>Portal)){
   setProfileStore(previous=>{
     const active=previous.active;
     const current=previous.profiles[active]||initial;
     const updated=typeof next==="function"?next(current):next;
     return {...previous,profiles:{...previous.profiles,[active]:updated}};
   });
 }
 const [page,setPage] = useState<Page>("home");
 const [selected,setSelected] = useState<ServiceKey>("recreation");
 const [notice,setNotice] = useState("");
 const [showMenu,setShowMenu] = useState(false);
 const [serviceSearch,setServiceSearch] = useState("");
 const [requestForm,setRequestForm] = useState({category:"Street and sidewalk",location:"",description:""});
 const [renewAcknowledged,setRenewAcknowledged] = useState(false);
 const [signup,setSignup] = useState({first:"",last:"",email:"",address:"",postal:"80137",accepted:false});
 const [tourEnabled,setTourEnabled]=useState(false);
 const [tourIndex,setTourIndex]=useState(0);
 const [tourCopyStatus,setTourCopyStatus] = useState("");
 useEffect(()=>{
   const params=new URLSearchParams(window.location.search);
   const requestedResident=params.get("resident");
   if(requestedResident&&RESIDENT_SEED.profiles[requestedResident]){
     setProfileStore(prev=>({...prev,active:requestedResident}));
   }
   if(params.get("demo")!=="1")return;
   const requested=params.get("step");
   const index=Math.max(0,DEMO_STOPS.findIndex(stop=>stop.id===requested));
   const stop=DEMO_STOPS[index];
   if(stop.id==="birth")setProfileStore(prev=>({...prev,active:"samira"}));
   if(stop.id==="license")setProfileStore(prev=>({...prev,active:"maya"}));
   setTourEnabled(true);setTourIndex(index);setPage(stop.page);
   if(stop.service)setSelected(stop.service as ServiceKey);

 },[]);
 const sample=hasRecord("license");
 const life=data.lifeEvent||LIFE_EVENT_SEED;

 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(profileStore));}catch{}},[profileStore]);
 function go(next:Page) {setPage(next);setNotice("");setShowMenu(false);window.scrollTo({top:0,behavior:"auto"});}
 function openService(key:ServiceKey) {
   setSelected(key);
   if(key==="license") go("license");
   else if(key==="requests") go("requests");
   else go("service");
 }
 function serviceStatus(key:ServiceKey){
   if(key==="recreation")return hasRecord(key)?"Active":"No pass";
   if(key==="license")return hasRecord(key)?(isLicenseRenewed(data.lifeEvent||LIFE_EVENT_SEED)?"Renewed":data.licenseSubmitted?"Renewal submitted":"Review needed"):"No license";
   if(key==="housing")return hasRecord(key)?"In review":"No application";
   if(key==="family")return hasRecord(key)?(data.lifeEvent?.birthRegistered?"New child recorded":"No recent birth"):"No family record";
   if(key==="requests")return data.tickets.some(t=>t.status!=="Closed")?"Open request":"No requests";
   if(key==="library")return hasRecord(key)?"Active card":"No card";
   if(key==="water")return hasRecord(key)?"Current":"No utility account";
   if(key==="transit")return hasRecord(key)?"Active":"No transit account";
   if(key==="school")return hasRecord(key)?"Enrolled":"No student record";
   if(key==="authority")return hasRecord(key)?"Inquiry on file":"No inquiry";
   return "Separate service";
 }
 function tone(key:ServiceKey):"neutral"|"good"|"warn"|"info"{
   const value=serviceStatus(key);
   return ["Active","Active card","Current","Enrolled","Renewed","New child recorded"].includes(value)?"good":["Renewal due","Review needed"].includes(value)?"warn":["In review","Open request","Renewal submitted","Inquiry on file"].includes(value)?"info":"neutral";
 }
 function actionLabel(key:ServiceKey){
   if(key==="license")return hasRecord(key)?"Review renewal":"View service";
   if(key==="requests")return "View requests";
   if(key==="recreation")return hasRecord(key)?"View pass and bookings":"View service";
   if(key==="housing")return hasRecord(key)?"View application":"View service";
   if(key==="family")return hasRecord(key)?"View family services":"View service";
   if(key==="library")return hasRecord(key)?"View library card":"View service";
   if(key==="water")return hasRecord(key)?"View bill":"View service";
   if(key==="transit")return hasRecord(key)?"View MyRide account":"View service";
   if(key==="school")return hasRecord(key)?"View enrollment":"View service";
   if(key==="authority")return hasRecord(key)?"View inquiry":"View service";
   return "View agency information";
 }
 function addActivity(description:string,office:string) {
   return {id:makeId("ACT-"),date:"2030-12-05",description,office};
 }

 function actOnLifeEvent(action:"wic"|"library"|"replay-birth"|"restore-birth"|"hold-inspection"|"clear-inspection"){
   const labels={
     wic:["WIC contact interest recorded","County Human Services"],
     library:["Newborn library offer accepted","Public Library District"],
     "replay-birth":["Birth registration event reset","County Clerk / Vital Records"],
     "restore-birth":["Birth registration received; eligible newborn coverage confirmed","County Clerk / State Human Services"],
     "hold-inspection":["Automatic license renewal paused for inspection review","Public Health"],
     "clear-inspection":["Inspection record cleared for automatic renewal","Public Health"],
   } as const;
   const [description,office]=labels[action];
   setData(prev=>{
     const current=prev.lifeEvent||LIFE_EVENT_SEED;
     const changed:LifeEventState={...current};
     if(action==="wic")changed.wicContact="requested";
     if(action==="library")changed.libraryOffer="accepted";
     if(action==="replay-birth"){changed.birthRegistered=false;changed.childCoverage="pending";changed.wicContact="not-requested";changed.libraryOffer="not-accepted";}
     if(action==="restore-birth"){changed.birthRegistered=true;changed.childCoverage="confirmed";}
     if(action==="hold-inspection")changed.inspectionClear=false;
     if(action==="clear-inspection")changed.inspectionClear=true;
     return {...prev,lifeEvent:changed,activity:[addActivity(description,office),...prev.activity]};
   });
   setNotice(description+".");
 }
 function submitRenewal(event:FormEvent<HTMLFormElement>) {
   event.preventDefault();
   if(!renewAcknowledged) {setNotice("Confirm that the business details are unchanged.");return;}
   if(data.licenseSubmitted) return;
   setData(prev=>({...prev,licenseSubmitted:true,activity:[addActivity("Food license renewal submitted for review","Public Health"),...prev.activity]}));
   setNotice("Renewal request saved. Public Health review is still required.");
 }
 function submitRequest(event:FormEvent<HTMLFormElement>) {
   event.preventDefault();
   if(!requestForm.description.trim() || !requestForm.location.trim()) {setNotice("Add a location and a description.");return;}
   const ticket:Ticket={id:makeId("SR-2030-"),category:requestForm.category,description:requestForm.description.trim(),location:requestForm.location.trim(),created:"2030-12-05",status:"Received"};
   setData(prev=>({...prev,tickets:[ticket,...prev.tickets],activity:[addActivity("Service request "+ticket.id+" received","Public Works"),...prev.activity]}));
   setRequestForm({category:"Street and sidewalk",location:"",description:""});
   setNotice("Request "+ticket.id+" saved to your account.");
 }
 function submitSignup(event:FormEvent<HTMLFormElement>) {
   event.preventDefault();
   if(!signup.first.trim()||!signup.last.trim()||!signup.email.includes("@")||!signup.address.trim()||!signup.accepted) {
     setNotice("Complete the required fields and confirm the account information.");return;
   }
   const account:Account={id:makeId("ED-2030-"),first:signup.first.trim(),last:signup.last.trim(),email:signup.email.trim(),address:signup.address.trim(),postal:signup.postal,created:"2030-11-17"};
   const key=account.id;
   setProfileStore(prev=>({...prev,active:key,profiles:{...prev.profiles,[key]:{
     ...initial,account,licenseSubmitted:false,reservations:[],housingMessage:"",
     libraryRenewed:false,waterIssue:"",transitBalanceCents:0,transitPasses:[],
     schoolLetterRequested:false,authorityFollowupRequested:false,
     lifeEvent:{...LIFE_EVENT_SEED,birthRegistered:false},
     tickets:[],activity:[addActivity("Account created","City account service")]
   }}}));
   setNotice("");
   go("home");
 }
 function restoreDemo(){
   if(!window.confirm("Restore the original Maya Rivera account?"))return;
   setProfileStore(prev=>({...prev,active:FIRST_KEY,profiles:{...prev.profiles,maya:initial}}));
   setNotice("Account restored.");go("home");
 }
 function selectNav(p:Page) {go(p);}
 const nav:{page:Page;label:string}[]=[
   {page:"home",label:"Home"},{page:"services",label:"All services"},{page:"license",label:"Licenses and permits"},
   {page:"requests",label:"My requests"},{page:"account",label:"Account and privacy"},
 ];
 function showTourStep(index:number){
   const safe=Math.min(Math.max(index,0),DEMO_STOPS.length-1);
   const stop=DEMO_STOPS[safe];
   setTourEnabled(true);setTourIndex(safe);setTourCopyStatus("");
   setPage(stop.page);if(stop.service)setSelected(stop.service as ServiceKey);
   if(stop.id==="birth")setProfileStore(prev=>({...prev,active:"samira"}));
   if(stop.id==="license")setProfileStore(prev=>({...prev,active:"maya"}));
   setShowMenu(false);setNotice("");
   const url=new URL(window.location.href);
   url.searchParams.set("demo","1");url.searchParams.set("step",stop.id);
   if(stop.id==="birth")url.searchParams.set("resident","samira");
   else if(stop.id==="license")url.searchParams.set("resident","maya");
   else if(getDemoResident(profileStore.active))url.searchParams.set("resident",profileStore.active);
   window.history.replaceState(null,"",url.pathname+url.search);
   window.scrollTo({top:0,behavior:"auto"});
 }
 function toggleTour(){
   if(tourEnabled){
     setTourEnabled(false);setTourCopyStatus("");
     window.history.replaceState(null,"",window.location.pathname);
   } else showTourStep(0);
 }
 function changeResident(key:string){
   if(!profileStore.profiles[key])return;
   setProfileStore(prev=>({...prev,active:key}));
   setNotice("");setTourCopyStatus("");
   if(tourEnabled){
     const url=new URL(window.location.href);
     url.searchParams.set("resident",key);
     window.history.replaceState(null,"",url.pathname+url.search);
   }
 }
 function resetProfiles(){
   if(!window.confirm("Reset the four example resident accounts?"))return;
   setProfileStore(prev=>({...prev,active:FIRST_KEY,profiles:{
     ...prev.profiles,
     maya:RESIDENT_SEED.profiles.maya,
     avery:RESIDENT_SEED.profiles.avery,
     helen:RESIDENT_SEED.profiles.helen,
     samira:RESIDENT_SEED.profiles.samira,
   }}));
   setNotice("Example accounts restored.");
 }
 async function copyTourLink(){
   const url=new URL(window.location.href);
   url.searchParams.set("demo","1");
   url.searchParams.delete("step");
   if(getDemoResident(profileStore.active))url.searchParams.set("resident",profileStore.active);
   try{await navigator.clipboard.writeText(url.toString());setTourCopyStatus("Walkthrough link copied.");}
   catch{setTourCopyStatus("Copy this address: "+url.toString());}
 }
 const matchingCatalog=catalog.filter(c=>(c.title+" "+c.office+" "+c.description).toLowerCase().includes(serviceSearch.toLowerCase()));
 const current=catalog.find(c=>c.key===selected)||catalog[0];
 return <div className="portal">
   <a href="#page-main" className="skip-link">Skip to main content</a>
   <div className="topline"><div className="site-container"><span>City and County of East Detroit</span></div></div>
   <header className="site-header"><div className="site-container head-inner">
     <button className="city-brand" onClick={()=>go("home")} aria-label="East Detroit account home">
       <span className="city-seal" aria-hidden="true">ED</span>
       <span><strong>East Detroit</strong><small>City and County Services</small></span>
     </button>
     <div className="head-actions"><button className="demo-switch" type="button" aria-pressed={tourEnabled} onClick={toggleTour}>{tourEnabled?"Exit demo":"Explore demo"}</button><button className="account-menu" onClick={()=>go("account")}>My account <span aria-hidden="true">›</span></button></div>
   </div></header>
   <div className="nav-shell"><div className="site-container nav-inner">
     <button className="mobile-nav-btn" aria-expanded={showMenu} onClick={()=>setShowMenu(!showMenu)}>Menu <span aria-hidden="true">{showMenu?"−":"+"}</span></button>
     <nav className={"primary-nav "+(showMenu?"expanded":"")} aria-label="Main menu">
       {nav.map(item=><button key={item.page} className={page===item.page?"active":""} onClick={()=>selectNav(item.page)} aria-current={page===item.page?"page":undefined}>{item.label}</button>)}
     </nav>
   </div></div>
   <main id="page-main" className="site-container main-content">
     {tourEnabled&&<><div className="demo-residents">
       <label htmlFor="demo-resident">Example resident</label>
       <select id="demo-resident" value={profileStore.active} onChange={event=>changeResident(event.target.value)}>
         {DEMO_RESIDENTS.map(person=><option key={person.key} value={person.key}>{person.account.first+" "+person.account.last+" · "+person.age}</option>)}
         {!getDemoResident(profileStore.active)&&<option value={profileStore.active}>{data.account.first+" "+data.account.last}</option>}
       </select>
       <span className="demo-resident-note">{getDemoResident(profileStore.active)?.context||"New account"}</span>
       <button type="button" className="text-link demo-reset" onClick={resetProfiles}>Reset examples</button>
     </div>
     <DemoTour step={tourIndex} onSelect={showTourStep} onClose={toggleTour} onCopy={copyTourLink} copyStatus={tourCopyStatus}/></>}
     {page==="home"&&<>
       <div className="page-intro intro-row"><div><h1>My East Detroit</h1><p>Welcome back, {data.account.first}. Your services are below.</p></div><div className="account-summary"><span>Resident account ID</span><strong>{data.account.id}</strong></div></div>
       <ProactiveHome resident={profileStore.active} event={life} onAction={actOnLifeEvent} onLicense={()=>go("license")} onFamily={()=>openService("family")}/>
       <section className="section-block">
         <div className="section-heading"><h2>My services</h2><button className="text-link" onClick={()=>go("services")}>Browse all services <span aria-hidden="true">→</span></button></div>
         <div className="table-scroll" role="region" aria-label="My services table" tabIndex={0}><table className="records-table"><thead><tr><th scope="col">Service</th><th scope="col">Responsible office</th><th scope="col">Status</th><th scope="col"><span className="visually-hidden">Action</span></th></tr></thead>
         <tbody>{catalog.filter(c=>!c.independent).map(c=><tr key={c.key}>
           <td><strong>{c.title}</strong>{c.independent&&<small>Separate public agency</small>}</td>
           <td>{c.office}</td><td><Badge tone={tone(c.key)}>{serviceStatus(c.key)}</Badge></td>
           <td className="action-cell"><button className="table-link" onClick={()=>openService(c.key)}>{actionLabel(c.key)} <span aria-hidden="true">→</span></button></td>
         </tr>)}</tbody></table></div>
       </section>
       <HouseholdSection resident={profileStore.active} event={life} onAction={actOnLifeEvent}/>
       <section className="section-block partner-list">
         <div className="section-heading"><h2>Other public agencies</h2></div>
         <p className="agency-intro">These organizations have their own governing bodies and control their records and services.</p>
         <div className="table-scroll" role="region" aria-label="Services from independent public agencies" tabIndex={0}><table className="records-table">
           <thead><tr><th scope="col">Service</th><th scope="col">Responsible agency</th><th scope="col">Status</th><th scope="col"><span className="visually-hidden">Action</span></th></tr></thead>
           <tbody>{catalog.filter(c=>c.independent).map(c=><tr key={c.key}>
             <td><strong>{c.title}</strong><small>Separate public agency</small></td>
             <td>{c.office}</td><td><Badge tone={tone(c.key)}>{serviceStatus(c.key)}</Badge></td>
             <td className="action-cell"><button className="table-link" onClick={()=>openService(c.key)}>{actionLabel(c.key)} <span aria-hidden="true">→</span></button></td>
           </tr>)}</tbody>
         </table></div>
       </section>
       <div className="home-lower">
         <section className="section-block recent"><div className="section-heading"><h2>Recent activity</h2><button className="text-link" onClick={()=>go("account")}>Account history <span aria-hidden="true">→</span></button></div>
           <ol className="activity-list">{data.activity.slice(0,4).map(a=><li key={a.id}><div><strong>{a.description}</strong><span>{a.office}</span></div><time>{dateFormat(a.date)}</time></li>)}</ol>
         </section>
       </div>
     </>}
     {page==="services"&&<>
       <div className="page-intro"><h1>All services</h1><p>Browse city-county services and services from independent public agencies.</p></div>
       <div className="filter-bar"><label htmlFor="service-search">Find a service</label><input id="service-search" type="search" placeholder="Search services or departments" value={serviceSearch} onChange={e=>setServiceSearch(e.target.value)}/></div>
       <div className="directory-list">{matchingCatalog.map(c=><article className="directory-row" key={c.key}>
         <div><h2>{c.title}</h2><p>{c.description}</p><small>{c.office}{c.independent?" · Independent public agency":""}</small></div>
         <div className="directory-action"><Badge tone={tone(c.key)}>{serviceStatus(c.key)}</Badge><button className="table-link" onClick={()=>openService(c.key)}>{actionLabel(c.key)} <span aria-hidden="true">→</span></button></div>
       </article>)}
       {matchingCatalog.length===0&&<p className="empty-state">No services match your search.</p>}</div>
     </>}
     {page==="license"&&<>
       <div className="page-intro"><button className="back-link" onClick={()=>go("home")}>← My services</button><h1>Business license</h1><p>Food establishment licensing · Public Health and Finance</p></div>
       {!sample?<div className="empty-state"><h2>No business license on file</h2><p>No business license is recorded for this account. Contact Public Health to locate an existing license.</p><Action secondary onClick={()=>go("services")}>Browse services</Action></div>:<>
         <div className="detail-header"><div><small>Food establishment license</small><h2>Cypress Cafe</h2><p>License FOOD-2030-0184</p></div><Badge tone={isLicenseRenewed(life)?"good":"warn"}>{isLicenseRenewed(life)?"Renewed for 2031":"Review required"}</Badge></div>
         <dl className="details-grid">
           <div><dt>License holder</dt><dd>Maya Rivera · Cypress Cafe</dd></div>
           <div><dt>Responsible office</dt><dd>City-County Public Health</dd></div>
           <div><dt>Valid through</dt><dd>{isLicenseRenewed(life)?"December 31, 2031":"December 31, 2030"}</dd></div>
           <div><dt>Premises</dt><dd>22 Example Plaza, Watkins, CO 80137</dd></div>
           <div><dt>Annual fee record</dt><dd>{life.feeSettled?"Settled · Finance":"Unpaid · Finance"}</dd></div>
           <div><dt>Inspection record</dt><dd>{life.inspectionClear?"Clear · Public Health":"Review required · Public Health"}</dd></div>
         </dl>
         <RenewalRecord event={life} tour={tourEnabled} onAction={actOnLifeEvent}/>
         {!isLicenseRenewed(life)&&<section className="form-section"><h2>{data.licenseSubmitted?"Renewal request":"Request manual review"}</h2>
           {data.licenseSubmitted?<div className="message-panel"><strong>Submitted for review</strong><p>Your request is on file. Public Health must resolve the outstanding check before renewal.</p></div>:
           <form onSubmit={submitRenewal}>
             <p>The renewal cannot complete automatically while a record requires review. You can request a manual review.</p>
             <label className="checkbox-row"><input type="checkbox" checked={renewAcknowledged} onChange={e=>setRenewAcknowledged(e.target.checked)}/><span>I confirm the license holder and business activity have not changed.</span></label>
             <Action type="submit" disabled={!renewAcknowledged}>Request review</Action>
           </form>}
         </section>}
       </>}
     </>}
     {page==="requests"&&<>
       <div className="page-intro"><h1>My service requests</h1><p>Track local issues reported to the city, or submit a new one.</p></div>
       <section className="section-block"><div className="section-heading"><h2>Reported issues</h2></div>
         {data.tickets.length?<div className="table-scroll" role="region" aria-label="Reported issues table" tabIndex={0}><table className="records-table"><thead><tr><th scope="col">Request</th><th scope="col">Issue</th><th scope="col">Reported</th><th scope="col">Status</th></tr></thead><tbody>
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
       {selected==="recreation"&&<ParksService sample={hasRecord("recreation")} passNumber={record.parkPass} validThrough={record.parkThrough} resident={data.account.first+" "+data.account.last} reservations={data.reservations||[]} onBook={reservation=>{
         setData(prev=>({...prev,reservations:[...(prev.reservations||[]),reservation],activity:[addActivity("Facility reservation "+reservation.id+" confirmed","Parks and Recreation"),...prev.activity]}));
         setNotice("Reservation "+reservation.id+" confirmed.");
       }}/>}
       {selected==="housing"&&<HousingService sample={hasRecord("housing")} message={data.housingMessage||""} onSend={message=>{
         setData(prev=>({...prev,housingMessage:message,activity:[addActivity("Message added to housing application","City Housing Division"),...prev.activity]}));
         setNotice("Your message was added to the application.");
       }}/>}
       {selected==="library"&&<LibraryService sample={hasRecord("library")} cardNumber={record.libraryCard} itemTitle={record.libraryItem} homeBranch={record.libraryBranch} resident={data.account.first+" "+data.account.last} renewed={data.libraryRenewed||false} onRenew={()=>{
         setData(prev=>({...prev,libraryRenewed:true,activity:[addActivity("Library loan renewed","Public Library District"),...prev.activity]}));
         setNotice("Loan renewed through December 26, 2030.");
       }}/>}
       {selected==="water"&&<WaterService sample={hasRecord("water")} accountNumber={record.waterAccount} serviceAddress={record.waterAddress} amountDue={record.waterBalance} issue={data.waterIssue||""} onInquiry={message=>{
         setData(prev=>({...prev,waterIssue:message,activity:[addActivity("Water billing inquiry recorded","Water and Sewer Authority"),...prev.activity]}));
         setNotice("Billing inquiry recorded.");
       }}/>}
       {selected==="transit"&&<TransitService sample={hasRecord("transit")} cardLastFour={record.transitCard} balanceCents={data.transitBalanceCents??(hasRecord("transit")?1425:0)} passes={data.transitPasses||[]} onAddFunds={()=>{
         setData(prev=>({...prev,transitBalanceCents:(prev.transitBalanceCents??0)+1000,activity:[addActivity("RTD stored value added","Regional Transportation District"),...prev.activity]}));
       }} onPurchase={product=>{
         setData(prev=>({...prev,transitBalanceCents:(prev.transitBalanceCents??0)-product.priceCents,transitPasses:[product,...(prev.transitPasses||[])],activity:[addActivity("RTD "+product.kind+" purchased","Regional Transportation District"),...prev.activity]}));
       }}/>}

       {selected==="family"&&<>{profileStore.active==="samira"?<FamilyService event={life} onAction={actOnLifeEvent} tour={tourEnabled}/>:<div className="empty-state"><h2>No family record on file</h2><p>This account has no recent birth record.</p></div>}
         {tourEnabled&&profileStore.active==="samira"&&<div className="scenario-control"><strong>Test the birth notification</strong><p>See what changes before and after Vital Records reports a birth.</p>
           <button type="button" className="tour-button" onClick={()=>actOnLifeEvent(life.birthRegistered?"replay-birth":"restore-birth")}>{life.birthRegistered?"Show before registration":"Receive birth registration"}</button>
         </div>}
       </>}
       {selected==="school"&&<SchoolDistrictService sample={hasRecord("school")} requested={data.schoolLetterRequested||false} onRequest={()=>{
         setData(prev=>({...prev,schoolLetterRequested:true,activity:[addActivity("School enrollment verification requested","East Detroit Unified School District"),...prev.activity]}));
         setNotice("Enrollment verification request recorded.");
       }}/>}
       {selected==="authority"&&<RegionalHousingService sample={hasRecord("authority")} requested={data.authorityFollowupRequested||false} onRequest={()=>{
         setData(prev=>({...prev,authorityFollowupRequested:true,activity:[addActivity("Housing authority status update requested","East Detroit Regional Housing Authority"),...prev.activity]}));
         setNotice("Status update request recorded.");
       }}/>}
       {selected==="state"&&<LimitedService title="State benefit services" agency="State of Colorado Human Services and State IT" outsideSystem="State-supervised benefits are administered through state and county program systems. Your county office can advise on applications and review procedures." reason="The State of Colorado sets program rules and system access. A city portal cannot issue a benefit decision or obtain full case records without state and federal authority."/>}
       {selected==="court"&&<LimitedService title="County Court services" agency="East Detroit County Court" outsideSystem="Court case files, calendars and filings are handled by the County Court. Personal case information is not displayed here." reason="The Court exercises judicial authority separate from the city executive. Court records and decisions remain under judicial rules and control."/>}
       {selected==="hospital"&&<LimitedService title="Hospital and patient services" agency="East Detroit Health and Hospital Authority" outsideSystem="For appointments and medical records, use the hospital's patient services. This city portal does not display clinical charts." reason="The public hospital authority is separately governed. Clinical records require the hospital's authorization and applicable healthcare privacy protections."/>}
     </>}
     {page==="account"&&<>
       <div className="page-intro"><h1>Account and privacy</h1><p>Your city login profile and the records kept by individual services are separate.</p></div>
       <div className="account-columns"><section className="section-block"><h2>Profile</h2><dl className="detail-list"><div><dt>Name</dt><dd>{data.account.first} {data.account.last}</dd></div><div><dt>Account ID</dt><dd>{data.account.id}</dd></div><div><dt>Email</dt><dd>{data.account.email}</dd></div><div><dt>Address given</dt><dd>{data.account.address}, CO {data.account.postal}</dd></div></dl>
         <div className="account-actions"><Action secondary onClick={()=>go("register")}>Create another account</Action><button className="text-link" onClick={restoreDemo}>Restore account</button></div>
       </section>
       <aside className="privacy-panel"><h2>How information is used</h2><p>Your city account helps you reach participating services. It does not give each department access to all of your records.</p><p>A change here does not automatically update a library, housing, public health or utility record.</p><p>Account information entered here is stored in this browser.</p><button className="text-link" onClick={()=>saveDownload("east-detroit-account.json",JSON.stringify(data,null,2))}>Download account information ↗</button></aside></div>
       <section className="section-block"><div className="section-heading"><h2>Service records</h2></div><div className="table-scroll" role="region" aria-label="Service records table" tabIndex={0}><table className="records-table"><thead><tr><th scope="col">Service</th><th scope="col">Record holder</th><th scope="col">Status</th><th scope="col"><span className="visually-hidden">Action</span></th></tr></thead><tbody>
         {catalog.map(c=><tr key={c.key}><td><strong>{c.title}</strong></td><td>{c.office}</td><td><Badge tone={tone(c.key)}>{serviceStatus(c.key)}</Badge></td><td><button className="table-link" onClick={()=>openService(c.key)}>View <span aria-hidden="true">→</span></button></td></tr>)}
       </tbody></table></div></section>
       <section className="section-block"><div className="section-heading"><h2>Account activity</h2></div><ol className="activity-list">{data.activity.map(a=><li key={a.id}><div><strong>{a.description}</strong><span>{a.office}</span></div><time>{dateFormat(a.date)}</time></li>)}</ol></section>
     </>}
     {page==="register"&&<>
       <div className="page-intro"><button className="back-link" onClick={()=>go("account")}>← Account and privacy</button><h1>Create an account</h1><p>Enter your contact information to create an East Detroit account.</p></div>
       <section className="form-section registration-section"><h2>Personal and contact information</h2><form onSubmit={submitSignup}>
         <div className="two-fields"><TextInput id="signup-first" label="First name" required value={signup.first} onChange={e=>setSignup({...signup,first:e.target.value})}/>
         <TextInput id="signup-last" label="Last name" required value={signup.last} onChange={e=>setSignup({...signup,last:e.target.value})}/></div>
         <TextInput id="signup-email" label="Email address" type="email" required value={signup.email} onChange={e=>setSignup({...signup,email:e.target.value})} />
         <TextInput id="signup-address" label="Street address" required value={signup.address} onChange={e=>setSignup({...signup,address:e.target.value})} helperText="Enter your street address."/>
         <div className="form-field"><label htmlFor="signup-postal">ZIP code</label><select id="signup-postal" value={signup.postal} onChange={e=>setSignup({...signup,postal:e.target.value})}><option>80137</option><option>80102</option><option>80018</option><option>80019</option></select><p className="field-help">A ZIP code alone does not establish city residency.</p></div>
         <label className="checkbox-row"><input type="checkbox" checked={signup.accepted} onChange={e=>setSignup({...signup,accepted:e.target.checked})}/><span>I confirm that the account information is correct.</span></label>
         <Action type="submit">Create account</Action>
       </form></section>
     </>}
     {notice&&<div className="toast-message" role="status"><span>{notice}</span><button onClick={()=>setNotice("")} aria-label="Dismiss message">Close</button></div>}
   </main>
   <footer className="page-footer"><div className="site-container"><strong>City and County of East Detroit</strong><span>City and county services</span></div></footer>
 </div>;
}
