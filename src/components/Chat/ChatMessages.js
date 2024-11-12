'use client'
import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils';
import React, { useContext } from 'react'
import MarkdownLite from '../MarkdownLite';

function ChatMessages() {
    const { messages } = useContext(MessagesContext);
    const inverseMessages = [...messages].reverse();

    return (
        <div className='px-2 py-3 flex-1 flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
            <div className='flex-1 flex-grow' />
            {inverseMessages.map((message) => (
                <div key={`${message.id}`} className='chat-message'>
                    <div className={cn({
                        'flex items-end': true,
                        'justify-end': message.isUserInput
                    })}>
                        <div className={cn({
                            'flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden': true,
                            'order-1 items-end': message.isUserInput,
                            'order-2 items-start': !message.isUserInput
                        })}>
                            <p className={cn({
                                'px-4 py-2 rounded-lg': true,
                                'bg-blue-500 text-white': message.isUserInput,
                                'bg-gray-200 text-gray-900': !message.isUserInput
                            })}>
                                <MarkdownLite text={message.text} />
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatMessages