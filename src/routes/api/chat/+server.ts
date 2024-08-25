import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import type { RequestHandler } from './$types';

const openai = createOpenAI({
	apiKey:
		'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'
});

export const POST = (async ({ request }) => {
	let { messages, brand, campaign, system } = await request.json();
	console.log(messages);
	console.log(messages.length);

	system = system.replace('{{brand}}', brand);
	system = system.replace('{{campaign}}', campaign);

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
