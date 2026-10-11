import PhotoCredit from '../../components/PhotoCredit';
import {photoFor} from '../../lib/photos';
import Link from 'next/link';
import {PageHero} from '../../components/Sections';
import {posts} from '../../lib/data';
export const metadata={title:'The academy journal'};
export default function Blog(){return <><PageHero eyebrow="Academy journal" title="Keep learning. Keep moving." description="Training ideas, practical guidance and perspectives for young athletes and the people who support them."/><section className="section"><div className="container sports-grid">{posts.map(p=><article className="journal-card" key={p.slug}><Link href={'/blog/'+p.slug}><img src={'/images/'+p.image} alt={photoFor(p.image)?.alt}/><span className="eyebrow">{p.category}</span><h3>{p.title}</h3></Link><PhotoCredit file={p.image}/><p>{p.description}</p><Link className="text-link" href={'/blog/'+p.slug}>Read article ↗</Link></article>)}</div></section></>}
