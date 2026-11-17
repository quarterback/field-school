import { useState } from "react";
import type { FormEvent } from "react";

export type FareProduct={
 id:string;
 kind:"3-hour pass"|"Day pass";
 priceCents:number;
 purchasedAt:string;
 status:"Not activated";
};
type Origin="Old Watkins"|"Watkins Junction"|"East Detroit Central Station";
type Destination="Denver Airport Station"|"Denver Union Station";
const stops:Origin[]=["Old Watkins","Watkins Junction","East Detroit Central Station"];
const destinations:Destination[]=["Denver Airport Station","Denver Union Station"];
const money=(cents:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);
function Summary({label,value}:{label:string;value:string}){return <div><dt>{label}</dt><dd>{value}</dd></div>;}
export function TransitService({sample,balanceCents,passes,onAddFunds,onPurchase,cardLastFour}:{
 sample:boolean;balanceCents:number;passes:FareProduct[];cardLastFour?:string;
 onAddFunds:()=>void;onPurchase:(product:FareProduct)=>void;
}){
 const [origin,setOrigin]=useState<Origin>("Watkins Junction");
 const [destination,setDestination]=useState<Destination>("Denver Airport Station");
 const [trip,setTrip]=useState<{from:Origin;to:Destination}|null>(null);
 const [message,setMessage]=useState("");
 const [showHistory,setShowHistory]=useState(false);
 const prices=[{kind:"3-hour pass" as const,priceCents:275},{kind:"Day pass" as const,priceCents:550}];
 function plan(e:FormEvent<HTMLFormElement>){e.preventDefault();setTrip({from:origin,to:destination});}
 function purchase(kind:FareProduct["kind"],priceCents:number){
  if(balanceCents<priceCents){setMessage("Add funds to your account before purchasing.");return;}
  const product:FareProduct={id:"RTD-2030-"+String(2110+passes.length),kind,priceCents,purchasedAt:"2030-12-05",status:"Not activated"};
  onPurchase(product);setMessage(kind+" added to your fare products.");
 }
 if(!sample)return <div className="empty-state"><h2>No transit account on file</h2><p>This account does not show a MyRide card. Contact RTD if you think your card is missing.</p></div>;
 return <div className="program rtd-service">
  <div className="program-heading"><div>
    <span className="record-type">Regional Transportation District</span>
    <h2>MyRide account</h2><p>Card ending {cardLastFour||"4821"}</p>
   </div><span className="status status-good">Active</span></div>
  <dl className="program-facts">
    <Summary label="Card balance" value={money(balanceCents)}/>
    <Summary label="Card" value={"MyRide •••• "+(cardLastFour||"4821")}/>
    <Summary label="Fare category" value="Standard"/>
    <Summary label="Card status" value="Active"/>
  </dl>
  <section className="program-section" aria-labelledby="rtd-fares">
    <h2 id="rtd-fares">Buy a pass or add money</h2>
    <p className="rtd-intro">Use your card balance to buy a pass, or add money first.</p>
    <div className="rtd-fare-options">
      {prices.map(f=><div className="rtd-fare-option" key={f.kind}>
        <div><strong>{f.kind}</strong><span>{money(f.priceCents)}</span></div>
        <button type="button" className="program-submit" onClick={()=>purchase(f.kind,f.priceCents)} disabled={balanceCents<f.priceCents}>Buy pass</button>
      </div>)}
    </div>
    <div className="rtd-add-funds"><span>Balance: <strong>{money(balanceCents)}</strong></span><button type="button" className="rtd-secondary-action" onClick={()=>{onAddFunds();setMessage("$10.00 added to your card balance.");}}>Add $10.00</button></div>
    {message&&<p className="rtd-feedback" role="status">{message}</p>}
    {passes.length>0&&<div className="rtd-products">
      <h3>Passes you bought</h3>
      <div className="table-scroll" role="region" aria-label="Purchased transit passes" tabIndex={0}>
        <table className="records-table"><thead><tr><th scope="col">Product</th><th scope="col">Reference</th><th scope="col">Price</th><th scope="col">Status</th></tr></thead>
        <tbody>{passes.map(p=><tr key={p.id}><td><strong>{p.kind}</strong></td><td>{p.id}</td><td>{money(p.priceCents)}</td><td><span className="status status-neutral">{p.status}</span></td></tr>)}</tbody></table>
      </div>
    </div>}
    <p className="muted-small">Activate a pass in the RTD app before you ride, or tap your MyRide card. This page does not give you a ticket for boarding.</p>
  </section>
  <section className="program-section" aria-labelledby="rtd-plan">
    <h2 id="rtd-plan">Plan a trip</h2>
    <form onSubmit={plan} className="rtd-planner">
      <div className="form-fields-inline">
        <div className="form-field"><label htmlFor="rtd-from">From</label><select id="rtd-from" value={origin} onChange={e=>{setOrigin(e.target.value as Origin);setTrip(null);}}>{stops.map(s=><option key={s}>{s}</option>)}</select></div>
        <div className="form-field"><label htmlFor="rtd-to">To</label><select id="rtd-to" value={destination} onChange={e=>{setDestination(e.target.value as Destination);setTrip(null);}}>{destinations.map(d=><option key={d}>{d}</option>)}</select></div>
      </div>
      <button className="program-submit" type="submit">Find trip</button>
    </form>
    {trip&&<div className="rtd-itinerary" aria-live="polite">
      <div className="rtd-itinerary-heading"><strong>Suggested route</strong><span>Proposed East Detroit connection</span></div>
      <ol className="rtd-legs">
        {trip.from!=="East Detroit Central Station"&&<li><span className="rtd-route-code">ED Local</span><div><strong>{trip.from} to East Detroit Central Station</strong><small>Local feeder service · Proposed</small></div></li>}
        <li><span className="rtd-route-code">EDX</span><div><strong>East Detroit Central Station to Denver Airport Station</strong><small>Regional connector · Proposed</small></div></li>
        {trip.to==="Denver Union Station"&&<li><span className="rtd-route-code">A</span><div><strong>Denver Airport Station to Denver Union Station</strong><small>RTD A Line · Existing regional rail connection</small></div></li>}
      </ol>
      <p className="muted-small">The East Detroit routes shown here are planned. This page cannot show departure times or live bus and train locations.</p>
    </div>}
  </section>
  <section className="program-section" aria-labelledby="rtd-account">
    <div className="section-heading"><h2 id="rtd-account">Account activity</h2><button type="button" className="text-link" onClick={()=>setShowHistory(!showHistory)} aria-expanded={showHistory}>{showHistory?"Hide":"View"} transactions</button></div>
    {showHistory&&<div className="table-scroll" role="region" aria-label="Transit account transaction history" tabIndex={0}>
      <table className="records-table"><thead><tr><th scope="col">Date</th><th scope="col">Transaction</th><th scope="col">Amount</th></tr></thead><tbody>
        {passes.map(p=><tr key={p.id}><td>Nov. 17, 2030</td><td>{p.kind} purchase</td><td>−{money(p.priceCents)}</td></tr>)}
        <tr><td>Nov. 12, 2030</td><td>Stored value added</td><td>+$10.00</td></tr>
        <tr><td>Nov. 10, 2030</td><td>3-hour fare</td><td>−$2.75</td></tr>
      </tbody></table>
    </div>}
    <div className="rtd-independent-note">RTD sets fares and schedules and keeps your transit account records. East Detroit does not control these services.</div>
  </section>
 </div>;
}
