import {PageHero} from '../../components/Sections';
import {EnquiryForm} from '../../components/forms';
import Map from '../../components/Map';
import {whatsapp} from '../../lib/data';
export const metadata={title:'Contact & directions'};
export default async function Contact({searchParams}){const query=await searchParams;return <><PageHero eyebrow="Contact" title="Good things start with a conversation." description="Training questions? Partnership ideas? Let’s find the right next step together."/><section className="section"><div className="container detail-grid"><EnquiryForm type="contact" initial={{subject:typeof query.subject==='string'?query.subject:''}}/><aside><span className="eyebrow">THE ACADEMY</span><h2>Come train with us.</h2><p>Nairobi, Kenya</p><p><a href="tel:+254112272061">+254 112 272 061</a></p><p><a href={whatsapp} className="text-link">Chat on WhatsApp ↗</a></p><Map/></aside></div></section></>}
