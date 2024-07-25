import { chatbotPrompt } from "@/lib/constants";
import { OpenAIStream } from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";

export async function POST(req) {
    const { messages } = await req.json();

    const parsedMessages = MessageArraySchema.parse(messages);

    const outboundMessages = parsedMessages.map((message) => ({
        role: message.isUserInput ? 'user' : 'system',
        content: message.text,
    }))

    outboundMessages.unshift({
        role: 'system',
        content: chatbotPrompt
    })

    const payload = {
        model: 'gpt-4o-mini',
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,
        n: 1,
    }

    const stream = await OpenAIStream(payload)

    return new Response(stream)
}