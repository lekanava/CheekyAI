import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteMessage } from '../features/message/messageSlice'

function MsgBox({ message }) {
    const deleteDispatch = useDispatch()

    useEffect(() => {
        // Озвучиваем только ответы от ИИ
        if (message.role === 'assistant') {
            speakWithElevenLabs(message.message)
        }
    }, [message])

    const speakWithElevenLabs = async (text) => {
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/cgSgspJ2msm6clMCkdW9", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": "sk_8de43daca4d539dcc4d01abbfb952f5e84be2bdc84574443",
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            })
        });

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        new Audio(audioUrl).play();
    };

    return (
        <>
            <div>
                <p className='break-words text-sm lg:text-lg xl:max-2xl:text-sm'>{message.message}</p>
                <button
                    className={`${message.role === 'assistant' ? 'hidden' : ''} my-1 p-1 hover:bg-blue-600 rounded-full`}
                    onClick={() => deleteDispatch(deleteMessage(message))}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default MsgBox
