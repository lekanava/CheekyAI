import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../features/message/messageSlice';
import axios from 'axios';

const ELEVENLABS_API_KEY = "твой_ключ";  // Вставь свой API-ключ
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";  // Можно поменять на другой голос

function MsgInput() {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const playTTS = async (text) => {
        try {
            const response = await axios.post(
                `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
                {
                    text,
                    model_id: "eleven_monolingual_v1",
                    voice_settings: { stability: 0.5, similarity_boost: 0.5 }
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "xi-api-key": ELEVENLABS_API_KEY
                    },
                    responseType: "arraybuffer"
                }
            );

            const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error("Ошибка TTS:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const tmpMessage = {
            message,
            role: 'user'
        };

        dispatch(addMessage(tmpMessage));  
        setMessage('');

        // Проговаривание текста
        playTTS(message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='fixed mx-auto flex px-4 py-2 inset-x-0 bottom-10 gap-2 lg:w-1/2'>
                <input
                    className="w-full rounded-full shadow-lg bg-gray-200 text-secondary lg:text-xl px-3 py-2 border-2 border-secondary"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button className="p-2 bg-primary text-white rounded-full">
                    Отправить
                </button>
            </div>
        </form>
    );
}

export default MsgInput;
