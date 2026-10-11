import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {photos} from '../lib/photos.js';
test('all seven selected photos exist locally as WebP files',async()=>{assert.equal(photos.length,7);for(const photo of photos){const bytes=await readFile('public/images/'+photo.file);assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP')}});
test('every displayed photo has creator, source, licence and context credits',async()=>{const credits=await readFile('image-credits.md','utf8');for(const photo of photos){assert.ok(photo.author&&photo.alt&&photo.context);assert.ok(photo.source.startsWith('https://'));assert.ok(photo.licenseUrl.startsWith('https://'));assert.ok(credits.includes(photo.file));assert.ok(credits.includes(photo.source));assert.ok(credits.includes(photo.author))}});
test('unverified archive JPEG copies are no longer in public images',async()=>assert.ok((await readdir('public/images')).every(name=>name.endsWith('.webp'))));
