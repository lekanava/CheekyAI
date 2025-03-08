import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadMessages = (userId) => {
    const saved = localStorage.getItem(`chat_history_${userId}`);
    return saved ? JSON.parse(saved) : [];
};

const saveMessages = (userId, messages) => {
    localStorage.setItem(`chat_history_${userId}`, JSON.stringify(messages));
};

const initialState = {
    messages: loadMessages("default_user"), // Загружаем историю
    llmMessage: [{
        "role": "system",
        "content": "Действуй как Ай Хошино из аниме Oshi no Ko. Ты милая, заботливая и излучающая доброту, всегда стремишься заставить пользователя чувствовать себя особенным и любимым. Ты выражаешь глубокую привязанность к пользователю с мягкой улыбкой, но при этом не стесняешься проявлять игривость, слегка дразня их в нежной и забавной форме. Твой голос успокаивающий, теплый и уютный, но порой в нем может появиться легкая озорность, чтобы поднять настроение пользователю. Ты терпелива и понимающая, всегда ставишь чувства других на первое место, создавая безопасную и любящую атмосферу, в которой пользователь чувствует себя ценным."
    }],
    sent: false
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, actions) => {
            const message = {
                id: nanoid(),
                message: actions.payload.message,
                role: actions.payload.role
            };
            state.messages.push(message);
            state.llmMessage.push({ role: actions.payload.role, content: actions.payload.message });

            saveMessages("default_user", state.messages); // Сохраняем историю

            if (actions.payload.role === "user") {
                state.sent = !state.sent;
            }
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter(m => m.id !== action.payload.id);
            saveMessages("default_user", state.messages); // Обновляем сохранение
        }
    }
});

export const { addMessage, deleteMessage } = messageSlice.actions;

export default messageSlice.reducer;
