import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL;
for(const route of ['/','/programmes','/programmes/football','/programmes/athletics','/programmes/basketball','/programmes/swimming','/programmes/volleyball','/programmes/martial-arts','/book','/scholarships','/sponsors','/coach-application','/contact','/events','/blog','/blog/building-a-training-routine','/blog/nutrition-for-young-athletes','/blog/scholarship-application-guide','/blog/what-to-ask-a-coach','/legal/privacy-policy','/legal/terms','/legal/cookie-policy','/tracker','/sitemap.xml','/robots.txt'])test('HTTP 200 '+route,{skip:!base},async()=>{const res=await fetch(base+route);assert.equal(res.status,200)});
test('unknown page is 404',{skip:!base},async()=>assert.equal((await fetch(base+'/not-a-page')).status,404));
test('unknown programme is 404',{skip:!base},async()=>assert.equal((await fetch(base+'/programmes/unknown')).status,404));
test('tracker API rejects unauthenticated reads',{skip:!base},async()=>assert.equal((await fetch(base+'/api/tracker?athleteId=CSA-001')).status,401));
test('cross-origin POST rejected',{skip:!base},async()=>assert.equal((await fetch(base+'/api/booking',{method:'POST',headers:{Origin:'https://attacker.example','Content-Type':'application/json'},body:'{}'})).status,403));
test('public availability never exposes personal data',{skip:!base},async()=>{const res=await fetch(base+'/api/availability');assert.equal(res.status,200);const data=await res.json();assert.ok(Array.isArray(data.slots));for(const slot of data.slots)for(const key of Object.keys(slot))assert.ok(['id','sport','ageGroup','startsAt','endsAt','remaining'].includes(key))});
test('tracker page does not render private records without authentication',{skip:!base},async()=>{const html=await (await fetch(base+'/tracker')).text();assert.ok(html.includes('Coach password'));assert.ok(!html.includes('Your athlete’s progress belongs here.'))});

test('500 error page returns status 500',{skip:!base},async()=>{const res=await fetch(base+'/500');assert.equal(res.status,500);assert.ok((await res.text()).includes('Something went wrong on our end. We are fixing it.'))});
test('blog API returns only trusted local article source',{skip:!base},async()=>{const res=await fetch(base+'/api/blog?slug=building-a-training-routine');assert.equal(res.status,200);assert.ok((await res.json()).article.mdx.includes('## Start with consistency'))});
test('blog API rejects arbitrary paths',{skip:!base},async()=>assert.equal((await fetch(base+'/api/blog?slug=../../.env.local')).status,404));
test('tracker rejects unauthenticated writes before storage access',{skip:!base},async()=>assert.equal((await fetch(base+'/api/tracker',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'})).status,401));
test('unknown API route is 404',{skip:!base},async()=>assert.equal((await fetch(base+'/api/not-a-route')).status,404));
