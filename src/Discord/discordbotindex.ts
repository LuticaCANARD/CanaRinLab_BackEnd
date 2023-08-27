import * as Utils from '../Utils/utils' // Formally.
import {LocalHandler,ElysiaInstance,TypedSchema,Context,Handler,Elysia} from 'elysia' // Elysia
import { swagger } from '@elysiajs/swagger'
import nacl from 'tweetnacl'


const discordInit = async (c:Context<any>) =>{
	console.log(c.headers);
	const PUBLIC_KEY = process.env["PUBLIC_KEY"]
	const signature = String(c.headers['X-Signature-Ed25519']);
	const timestamp = String(c.headers['X-Signature-Timestamp']);
	const verbody = JSON.stringify(c.body); // rawBody is expected to be a string, not raw bytes

	const isVerified = nacl.sign.detached.verify(
		Buffer.from(timestamp + verbody),
		Buffer.from(signature, 'hex'),
		Buffer.from(PUBLIC_KEY, 'hex')
	);

	if (!isVerified) {
		c.set.status = 401
		return'invalid request signature';
	}
	if(c.body["type"] == 1){
		c.set.status = 200;
		return {
			type:1
		};
	}

}

export const DiscordRouter = (app:Elysia <ElysiaInstance>) :Elysia<ElysiaInstance> => {
	app
	.post('/',discordInit)
	return app;
}  