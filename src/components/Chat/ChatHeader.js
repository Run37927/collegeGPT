import React from 'react'

function ChatHeader() {
    return (
        <div className='w-full flex gap-3 justify-start items-center text-zinc-800'>
            <div className="flex flex-col items-start text-sm">
                <p className='text-xs'>Chat with</p>
                <div className="flex gap-1.5 items-center">
                    <p className='status-indicator mr-1' />
                    <p className='font-medium'>CollegeGPT</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader