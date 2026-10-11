import {coachSession} from '../../lib/server';
import {CoachLogin,Tracker} from '../../components/Tracker';
import {PageHero} from '../../components/Sections';
export const dynamic='force-dynamic';
export const metadata={title:'Coach portal',robots:{index:false,follow:false}};
export default async function TrackerPage(){const session=await coachSession();return <><PageHero eyebrow="Coach portal" title="Progress you can see. Potential you can build." description="Private performance tracking for authorised academy coaches."/><section className="section"><div className="container">{session?<Tracker/>:<CoachLogin/>}</div></section></>}
