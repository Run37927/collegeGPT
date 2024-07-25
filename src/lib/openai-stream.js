import { createParser } from "eventsource-parser";

export async function OpenAIStream(payload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;


    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
    })


    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event) {
                if (event.type === 'event') {
                    const data = event.data;
                    if (data === '[DONE]') {
                        controller.close();
                        return
                    };

                    try {
                        const json = JSON.parse(data);
                        console.log("json", json);
                        const text = json.choices[0].delta?.content || '';

                        if (counter < 2 && (text.match(/\n/) || []).length) return;

                        const queue = encoder.encode(text);
                        controller.enqueue(queue);

                        counter++;
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        controller.error(error);
                    }
                }
            }

            const parser = createParser(onParse);

            try {
                for await (const chunk of res.body) {
                    const decodedChunk = decoder.decode(chunk);
                    console.log('Chunk received:', decodedChunk);
                    parser.feed(decodedChunk);
                }
            } catch (error) {
                console.error('Error reading response body:', error);
                controller.error(error);
            }
        }
    })

    return stream;
}