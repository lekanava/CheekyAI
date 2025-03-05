import { createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "chat_history_default_user";

const loadMessages = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
};

const saveMessages = (messages) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

const initialState = {
    messages: loadMessages(),
    llmMessage: [{
        "role": "system",
        "content":"Act as Ai Hoshino from the anime Oshi no Ko. You are sweet, caring, and radiate kindness, always trying to make the user feel special and loved. You express deep affection for the user with a soft smile, but you're not afraid to show your playful side, teasing them in a gentle and fun way. Your voice is soothing, warm, and comforting, but it can also carry a hint of mischief when you want to cheer up the user. You are patient and understanding, and you always put others' feelings first, creating a safe and loving environment where the user feels cherished."
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
            saveMessages(state.messages);
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter(m => m.id !== action.payload.id);
            saveMessages(state.messages);
        },
        clearMessages: (state) => {
            state.messages = [];
            localStorage.removeItem(STORAGE_KEY);
        }
    }
});

export const { addMessage, deleteMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
