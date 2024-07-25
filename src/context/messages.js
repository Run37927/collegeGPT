import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const MessagesContext = createContext({
    messages: [],
    isMessageUpdating: false,
    addMessage: () => { },
    removeMessage: () => { },
    updateMessage: () => { },
    setIsMessageUpdating: () => { },
});

export const MessagesProvider = ({ children }) => {
    const [isMessageUpdating, setIsMessageUpdating] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: nanoid(),
            text: 'Hello, how can I help you today?',
            isUserInput: false,
        }
    ]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const removeMessage = (messageId) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    };

    const updateMessage = (messageId, updateFn) => {
        setMessages((prevMessages) => prevMessages.map((msg) => {
            if (msg.id === messageId) {
                return { ...msg, text: updateFn(msg.text) };
            }

            return msg;
        }))
    }

    return (
        <MessagesContext.Provider value={{
            messages,
            addMessage,
            removeMessage,
            updateMessage,
            isMessageUpdating,
            setIsMessageUpdating,
        }}>
            {children}
        </MessagesContext.Provider>
    )
}