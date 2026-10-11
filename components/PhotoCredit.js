import Link from 'next/link';
import {photoFor} from '../lib/photos';
export default function PhotoCredit({file}){const photo=photoFor(file);if(!photo)return null;return <span className="photo-credit"><Link href={'/image-credits#'+file.replace('.webp','')}>Photo: {photo.author} · {photo.license}</Link></span>}
