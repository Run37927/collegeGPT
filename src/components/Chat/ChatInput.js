'use client'
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { nanoid } from 'nanoid';
import { useToast } from '../ui/use-toast';
import { MessagesContext } from '@/context/messages';

function ChatInput() {
    const [input, setInput] = useState('');
    const { messages, addMessage, removeMessage, updateMessage, setIsMessageUpdating } = useContext(MessagesContext);
    const textareaRef = useRef(null);

    const { toast } = useToast();

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async (message) => {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: [message] })
            })

            return response.body;
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error('No stream found');

            const id = nanoid();
            const responseMessage = {
                id,
                isUserInput: false,
                text: '',
            }

            addMessage(responseMessage);
            setIsMessageUpdating(true);

            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading;
                const chunkValue = decoder.decode(value);
                // console.log(chunkValue);
                updateMessage(id, (prev) => prev + chunkValue);
            }

            // cleanup
            setIsMessageUpdating(false);
            setInput('');

            setTimeout(() => {
                textareaRef.current?.focus();
            }, 10)
        },
        onMutate(message) {
            addMessage(message);
        },
        onError: (error) => {
            console.error("Error: ", error);
            toast({
                variant: "destructive",
                title: `Uh oh! Something went wrong.`,
                description: `Please try again.`
            });
        },
    })

    return (
        <div className='border-t border-zinc-300 px-4'>
            <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
                <TextareaAutosize
                    ref={textareaRef}
                    rows={2}
                    maxRows={4}
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();

                            const message = {
                                id: nanoid(),
                                isUserInput: true,
                                text: input,
                            }

                            sendMessage(message);

                            setInput('')
                        }
                    }}
                    placeholder='ask anything...'
                    className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
                />
            </div>
        </div>
    )
}

export default ChatInput