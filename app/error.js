'use client';
export default function ErrorPage({reset}){return <section className="error-page"><span className="error-code">500 · A SHORT TIMEOUT</span><h1>Something went wrong on our end. We are fixing it.</h1><button className="button" onClick={reset}>Try Again</button><p style={{marginTop:25}}>Need help? WhatsApp <a href="https://wa.me/254112272061">+254 112 272 061</a></p></section>}
