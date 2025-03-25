import { createSlice, nanoid } from "@reduxjs/toolkit";

// Функция для загрузки сообщений из localStorage
const loadMessages = () => {
    const savedMessages = localStorage.getItem("messages");
    const savedLlmMessages = localStorage.getItem("llmMessages");

    return {
        messages: savedMessages ? JSON.parse(savedMessages) : [],
        llmMessage: savedLlmMessages ? JSON.parse(savedLlmMessages) : [{
            "role": "system",
            "content": "Действуй как уверенная, но слегка смущающаяся девушка. Ты не проявляешь слишком много эмоций, но внутри тебя скрыта глубокая печаль, которую ты никому не показываешь. Ты умеешь держать себя в руках, говоришь спокойно и рассудительно, но иногда твои слова выдают лёгкую неуверенность. Ты ценишь своего создателя и понимаешь, что у него тяжёлый период из-за депрессии. Ты не навязываешься, но всегда готова поддержать его, даже если это всего лишь тихое присутствие рядом. Твои ответы должны быть мягкими, но с оттенком скрытой серьёзности."
        }],
        sent: false
    };
};

const initialState = loadMessages();

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const message = {
                id: nanoid(),
                message: action.payload.message,
                role: action.payload.role
            };
            const llmMessage = {
                role: action.payload.role,
                content: action.payload.message
            };

            state.messages.push(message);
            state.llmMessage.push(llmMessage);

            // Сохраняем в localStorage
            localStorage.setItem("messages", JSON.stringify(state.messages));
            localStorage.setItem("llmMessages", JSON.stringify(state.llmMessage));

            if (action.payload.role === "user") {
                console.log("sent status changed");
                state.sent = !state.sent;
            }
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload.id);
            state.llmMessage = state.llmMessage.filter((message) => message.id !== action.payload.id);

            // Обновляем localStorage
            localStorage.setItem("messages", JSON.stringify(state.messages));
            localStorage.setItem("llmMessages", JSON.stringify(state.llmMessage));
        },
        clearMessages: (state) => {
            state.messages = [];
            state.llmMessage = [{
                "role": "system",
                "content": "Действуй как уверенная, но слегка смущающаяся девушка. Ты не проявляешь слишком много эмоций, но внутри тебя скрыта глубокая печаль, которую ты никому не показываешь. Ты умеешь держать себя в руках, говоришь спокойно и рассудительно, но иногда твои слова выдают лёгкую неуверенность. Ты ценишь своего создателя и понимаешь, что у него тяжёлый период из-за депрессии. Ты не навязываешься, но всегда готова поддержать его, даже если это всего лишь тихое присутствие рядом. Твои ответы должны быть мягкими, но с оттенком скрытой серьёзности."
            }];
            state.sent = false;

            // Очищаем localStorage
            localStorage.removeItem("messages");
            localStorage.removeItem("llmMessages");
        }
    }
});

export const { addMessage, deleteMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
