import {PageHero} from '../../components/Sections';
import {BookingForm} from '../../components/forms';
import {getAvailability} from '../../lib/server';
import {sports} from '../../lib/data';
export const dynamic='force-dynamic';
export const metadata={title:'Book a free trial',robots:{index:false,follow:true}};
export default async function Book({searchParams}){const query=await searchParams;let availability={slots:[],configured:false};try{availability=await getAvailability()}catch{}return <><PageHero eyebrow="Book a trial" title="Every champion starts somewhere." description="Let’s find your child’s first session. No payment. No pressure. Just the opportunity to give it a go."/><section className="section light"><div className="container"><BookingForm initialSport={sports.some(s=>s.slug===query.sport)?query.sport:''} initialSlots={availability.slots} serviceConfigured={availability.configured}/></div></section></>}
