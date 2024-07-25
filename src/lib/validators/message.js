import { z } from 'zod';

export const MessageSchema = z.object({
    id: z.string(),
    isUserInput: z.boolean(),
    text: z.string()
})

// array validator
export const MessageArraySchema = z.array(MessageSchema);