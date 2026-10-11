import {PageHero,SportsGrid} from '../../components/Sections';
export const metadata={title:'Sports & programmes'};
export const revalidate=3600;
export default function Programmes(){return <><PageHero eyebrow="Programmes" title="Find your sport. Find your stride." description="Six ways to get moving. One place to grow. Explore age-appropriate training for young athletes in Nairobi."/><section className="section"><div className="container"><SportsGrid/></div></section></>}
