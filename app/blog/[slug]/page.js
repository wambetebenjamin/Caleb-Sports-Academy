import PhotoCredit from '../../../components/PhotoCredit';
import {photoFor} from '../../../lib/photos';
import {notFound} from 'next/navigation';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {posts} from '../../../lib/data';
import {article} from '../../../lib/blog';
import {PageHero} from '../../../components/Sections';
export function generateStaticParams(){return posts.map(({slug})=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params,p=posts.find(p=>p.slug===slug);return {title:p?.title,description:p?.description,openGraph:{title:p?.title,description:p?.description,type:'article',images:p?['/images/'+p.image]:[]}}}
export default async function Post({params}){const {slug}=await params,p=posts.find(p=>p.slug===slug);if(!p)notFound();const source=await article(slug);return <><PageHero eyebrow={p.category} title={p.title} description={p.description}/><section className="section"><article className="container article"><img className="detail-banner" src={'/images/'+p.image} alt={photoFor(p.image)?.alt}/><PhotoCredit file={p.image}/><p className="muted-note">Caleb Academy Journal · Editorial guide · Licensed illustrative imagery</p><MDXRemote source={source}/></article></section></>}
