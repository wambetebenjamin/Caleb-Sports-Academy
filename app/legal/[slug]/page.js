import {notFound} from 'next/navigation';
import {legal} from '../../../lib/legal';
import {PageHero} from '../../../components/Sections';
export function generateStaticParams(){return Object.keys(legal).map(slug=>({slug}))}
export async function generateMetadata({params}){return {title:legal[(await params).slug]?.title||'Legal'}}
export default async function Legal({params}){const content=legal[(await params).slug];if(!content)notFound();return <><PageHero eyebrow="Legal" title={content.title} description="Your trust matters. Especially when it comes to young athletes."/><section className="section"><article className="container legal-copy"><p className="callout"><strong>Draft for academy and legal review.</strong> Updated 11 October 2026. This preview is not a certification of regulatory compliance.</p>{content.sections.map(([title,text])=><section key={title}><h2>{title}</h2><p>{text}</p></section>)}</article></section></>}
