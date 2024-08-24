import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import type { RequestHandler } from './$types';

import { env } from '$env/dynamic/private';

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY ?? ''
});

export const POST = (async ({ request }) => {
	const { messages } = await request.json();
	console.log(messages);

	const result = await streamText({
		model: openai('gpt-4o-mini'),
		messages: convertToCoreMessages(messages),
		async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
			// implement your own logic here, e.g. for storing messages
			// or recording token usage
		}
	});

	return result.toDataStreamResponse();
}) satisfies RequestHandler;
