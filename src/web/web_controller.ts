/**
 * 여기는 웹 API만 다룬다. 프론트는 다른 프로젝트에서 다루게 한다
 */

import {LocalHandler,ElysiaInstance,TypedSchema,Context,Handler,Elysia} from 'elysia' // Elysia
import {getWeather} from '../common/weather'
import { SHA256,CryptoHasher } from 'bun'
import { randomInt } from 'node:crypto'
import * as Utils from '../Utils/utils'
export const webRoute = (app:Elysia <ElysiaInstance>) : Elysia<ElysiaInstance> => {
	app
    
	return app;
} 