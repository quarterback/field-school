export type DemoStop = {
  id: string;
  title: string;
  purpose: string;
  question: string;
  page: "home" | "service" | "license" | "services";
  service?: string;
};
export const DEMO_STOPS: DemoStop[] = [
  {
    id:"home",title:"Resident account",page:"home",
    purpose:"Start with the services a resident can already see and use in one account.",
    question:"Which services should be visible here without a separate sign-in?"
  },
  {
    id:"school",title:"Independent school district",page:"service",service:"school",
    purpose:"See how a parent could view a school enrollment record and request verification.",
    question:"What evidence proves a resident may view a child's record, and who resolves errors?"
  },
  {
    id:"transit",title:"Regional transportation",page:"service",service:"transit",
    purpose:"Compare public routes with a personal transit pass maintained by RTD.",
    question:"Should the city display personal transit data, or only public schedules?"
  },
  {
    id:"authority",title:"Regional housing authority",page:"service",service:"authority",
    purpose:"Inspect a separately governed housing inquiry without folding it into a city assistance case.",
    question:"Which authority records, if any, can appear in the city portal?"
  },
  {
    id:"library",title:"Library district",page:"service",service:"library",
    purpose:"View a library account and renew an item using records held by the Library District.",
    question:"Should a city portal show borrowing history, or only library card information?"
  },
  {
    id:"license",title:"Public Health and Finance",page:"license",
    purpose:"Review a food establishment license and the proposed renewal transaction.",
    question:"Who verifies payment and inspection status before the license can be renewed?"
  },
  {
    id:"scope",title:"Other agencies",page:"services",
    purpose:"Review examples from agencies whose confidential records are not available through this portal.",
    question:"Which agencies should participate, which should decline, and under what conditions?"
  },
];
export function DemoTour({step,onSelect,onClose,onCopy,copyStatus}:{
  step:number;onSelect:(index:number)=>void;onClose:()=>void;onCopy:()=>void;copyStatus:string;
}) {
 const current=DEMO_STOPS[step]||DEMO_STOPS[0];
 return <section className="guided-tour" aria-label="Vendor demonstration walkthrough">
  <div className="tour-heading"><div><span className="tour-counter">Vendor walkthrough · {step+1} of {DEMO_STOPS.length}</span><h2>{current.title}</h2></div><button type="button" className="tour-exit" onClick={onClose}>Exit walkthrough</button></div>
  <p>{current.purpose}</p>
  <p className="tour-question"><strong>For discussion:</strong> {current.question}</p>
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
