// Reads an operator-supplied JSON file. No fictional public slots are seeded.
import {readFile} from 'node:fs/promises';
import {createClient} from '@vercel/kv';
import {z} from 'zod';
if(!process.env.KV_REST_API_URL||!process.env.KV_REST_API_TOKEN)throw Error('Set KV_REST_API_URL and KV_REST_API_TOKEN in the process environment.');
const file=process.argv[2];if(!file)throw Error('Usage: node --env-file=.env.local scripts/seed-availability.mjs path/to/approved-slots.json');
const schema=z.array(z.object({id:z.string().regex(/^[A-Za-z0-9_-]{1,100}$/),sport:z.enum(['football','athletics','basketball','swimming','volleyball','martial-arts']),ageGroup:z.enum(['6–9','10–13','14–18']),startsAt:z.string().datetime({offset:true}),endsAt:z.string().datetime({offset:true}),remaining:z.number().int().min(1).max(100)}).refine(s=>Date.parse(s.startsAt)>Date.now()&&Date.parse(s.endsAt)>Date.parse(s.startsAt),'Slots must be future sessions with a valid end time'));
const slots=schema.parse(JSON.parse(await readFile(file,'utf8')));if(new Set(slots.map(s=>s.id)).size!==slots.length)throw Error('Duplicate slot IDs in input.');const kv=createClient({url:process.env.KV_REST_API_URL,token:process.env.KV_REST_API_TOKEN});for(const slot of slots){const created=await kv.set('slot:'+slot.id,slot,{nx:true});if(!created)throw Error('Slot already exists; refusing to reset capacity: '+slot.id);await kv.sadd('availability:ids',slot.id)}console.log(`Added ${slots.length} approved slots. Existing capacity was not overwritten.`);
