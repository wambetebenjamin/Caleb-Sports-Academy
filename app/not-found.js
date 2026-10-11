import PhotoCredit from '../components/PhotoCredit';
import Link from 'next/link';
export default function NotFound(){return <section className="error-page"><span className="error-code">404 · OUT OF PLAY</span><h1>This page was not found. Keep moving forward.</h1><Link href="/" className="button">Back to the Academy. ↗</Link><img src="/images/kilifi-football.webp" alt="Community football on a field in Kilifi County, Kenya"/><PhotoCredit file="kilifi-football.webp"/></section>}
