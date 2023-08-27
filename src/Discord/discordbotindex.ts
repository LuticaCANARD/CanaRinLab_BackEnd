import * as Utils from '../Utils/utils' // Formally.
import {LocalHandler,ElysiaInstance,TypedSchema,Context,Handler,Elysia} from 'elysia' // Elysia
import { swagger } from '@elysiajs/swagger'
import nacl from 'tweetnacl'


const discordInit = async ({ body, set }) =>{
	const PUBLIC_KEY = process.env["PUBLIC_KEY"]
	const signature = body.get('X-Signature-Ed25519');
	const timestamp = body.get('X-Signature-Timestamp');
	const verbody = body.rawBody; // rawBody is expected to be a string, not raw bytes

	const isVerified = nacl.sign.detached.verify(
		Buffer.from(timestamp + verbody),
		Buffer.from(signature, 'hex'),
		Buffer.from(PUBLIC_KEY, 'hex')
	);

	if (!isVerified) {
		return set.status(401).end('invalid request signature');
	}
	if(body["type"] == 1){
		set.status = 200;
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