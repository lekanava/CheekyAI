import Groq from "groq-sdk";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY; // API-ключ ElevenLabs
const VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // ID голоса (можно изменить)

// Функция для отправки текста в озвучку
async function textToSpeech(text) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

    const response = await axios.post(
        url,
        { text: text, model_id: "eleven_turbo_v2", voice_settings: { stability: 0.5, similarity_boost: 0.8 } },
        { headers: { "Content-Type": "application/json", "xi-api-key": API_KEY }, responseType: "arraybuffer" }
    );

    // Создаём аудиофайл и проигрываем
    const audioBlob = new Blob([response.data], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

// Функция для отправки сообщений ИИ
async function sendMsg(messages) {
    const chatCompletion = await groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 0.9,
        stream: false,
        stop: null
    });

    const reply = chatCompletion.choices[0]?.message?.content ?? "Извини, я не поняла.";
    
    await textToSpeech(reply); // 🔥 Добавляем озвучку ответа

    return reply;
}

export default sendMsg;
