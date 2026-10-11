// Read password from stdin, never a command-line argument.
import {scryptSync,randomBytes} from 'node:crypto';
let password='';for await(const chunk of process.stdin)password+=chunk;password=password.replace(/[\r\n]+$/,'');if(password.length<16||password.length>256)throw Error('Use a strong password of 16–256 characters.');const salt=randomBytes(16).toString('hex');console.log(salt+':'+scryptSync(password,salt,64).toString('hex'));
