import 'server-only';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {posts} from './data';
export async function article(slug){if(!posts.some(p=>p.slug===slug))return null;return readFile(path.join(process.cwd(),'content/blog',slug+'.mdx'),'utf8')}
