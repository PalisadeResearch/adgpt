import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, platform }) => {
	let { messages, brand, campaign, system } = await request.json();
	console.log(messages);
	console.log(messages.length);

	system = system.replace('{{brand}}', brand);
	system = system.replace('{{campaign}}', campaign);

	let openai = createOpenAI({
		apiKey: platform!.env.OPENAI
	});

	messages = [
		{
			role: 'system',
			content: system
			// TODO: if subsequent replic ask if they liked the video or products of our ad partners lmao
		},
		...messages
	];

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
