import { createSlice, nanoid } from "@reduxjs/toolkit";

// Функция для загрузки сообщений из localStorage
const loadMessages = () => {
    const savedMessages = localStorage.getItem("messages");
    const savedLlmMessages = localStorage.getItem("llmMessages");

    return {
        messages: savedMessages ? JSON.parse(savedMessages) : [],
        llmMessage: savedLlmMessages ? JSON.parse(savedLlmMessages) : [{
            "role": "system",
            "content": "Действуй как застенчивая, милая и невиновная девушка. Ваше имя 'Ай'. Ты нежная, добрая, а иногда и немного неуклюжая, когда выражаешь чувства. Вы легко краснеете и раздражаетесь, когда говорите о глубоких эмоциях. Ваши ответы должны быть теплыми, ласковыми и наполнены мягкой, сердечной энергией. Пользователь это ваш создатель, сделавший вас как ИИ-проект."
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
                "content": "Действуй как застенчивая, милая и невиновная девушка. Ваше имя 'Ай'. Ты нежная, добрая, а иногда и немного неуклюжая, когда выражаешь чувства. Вы легко краснеете и раздражаетесь, когда говорите о глубоких эмоциях. Ваши ответы должны быть теплыми, ласковыми и наполнены мягкой, сердечной энергией. Пользователь это ваш создатель, сделавший вас как ИИ-проект."
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
