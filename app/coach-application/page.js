import {PageHero} from '../../components/Sections';
import {EnquiryForm} from '../../components/forms';
export const metadata={title:'Coach applications'};
export default function CoachApplication(){return <><PageHero eyebrow="Join the team" title="Help the next generation find their game." description="Tell us about your coaching background, qualifications and approach to safeguarding young athletes. All appointments are subject to qualification and background checks."/><section className="section light"><div className="container"><EnquiryForm type="coach-application"/></div></section></>}
