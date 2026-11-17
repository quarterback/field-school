export type DemoStop = {
  id: string;
  title: string;
  purpose: string;
  page: "home" | "service" | "license" | "services";
  service?: string;
};
export const DEMO_STOPS: DemoStop[] = [
  {
    id:"home",title:"Resident account",page:"home",
    purpose:"Start with the services a resident can already see and use in one account."
  },
  {
    id:"people",title:"Compare resident accounts",page:"home",
    purpose:"Choose Maya, Avery, or Helen in the resident selector. Each person has different services and records."
  },
  {
    id:"birth",title:"After a child is born",page:"service",service:"family",
    purpose:"A registered birth updates the household and triggers newborn coverage and family offers. Replay the event to see what changed."
  },
  {
    id:"school",title:"Independent school district",page:"service",service:"school",
    purpose:"See how a parent could view a school enrollment record and request verification."
  },
  {
    id:"transit",title:"Regional transportation",page:"service",service:"transit",
    purpose:"Compare public routes with a personal transit pass maintained by RTD."
  },
  {
    id:"authority",title:"Regional housing authority",page:"service",service:"authority",
    purpose:"Inspect a separately governed housing inquiry without folding it into a city assistance case."
  },
  {
    id:"library",title:"Library district",page:"service",service:"library",
    purpose:"View a library account and renew an item using records held by the Library District."
  },
  {
    id:"license",title:"Public Health and Finance",page:"license",
    purpose:"See a food establishment license renewed from existing records. Change the inspection result to see the renewal stop."
  },
  {
    id:"scope",title:"Other agencies",page:"services",
    purpose:"Review examples from agencies whose confidential records are not available through this portal."
  },
];
export function DemoTour({step,onSelect,onClose,onCopy,copyStatus}:{
  step:number;onSelect:(index:number)=>void;onClose:()=>void;onCopy:()=>void;copyStatus:string;
}) {
 const current=DEMO_STOPS[step]||DEMO_STOPS[0];
 return <section className="guided-tour" aria-label="Vendor demonstration walkthrough">
  <div className="tour-heading"><div><span className="tour-counter">Vendor walkthrough · {step+1} of {DEMO_STOPS.length}</span><h2>{current.title}</h2></div><button type="button" className="tour-exit" onClick={onClose}>Exit walkthrough</button></div>
  <p>{current.purpose}</p>
  <div className="tour-actions">
   <label htmlFor="tour-stop">View</label>
   <select id="tour-stop" value={step} onChange={e=>onSelect(Number(e.target.value))}>
    {DEMO_STOPS.map((s,i)=><option key={s.id} value={i}>{i+1}. {s.title}</option>)}
   </select>
   <button type="button" className="tour-button" disabled={step===0} onClick={()=>onSelect(step-1)}>Previous</button>
   <button type="button" className="tour-button tour-next" onClick={()=>step<DEMO_STOPS.length-1?onSelect(step+1):onClose()}>{step===DEMO_STOPS.length-1?"Finish":"Next"}</button>
   <button type="button" className="tour-copy" onClick={onCopy}>Copy walkthrough link</button>
  </div>
  {copyStatus&&<p className="tour-copy-status" role="status">{copyStatus}</p>}
 </section>;
}
