import { createSlice, nanoid } from "@reduxjs/toolkit";

// Функция для загрузки сообщений из localStorage
const loadMessages = () => {
const savedMessages = localStorage.getItem("messages");
const savedLlmMessages = localStorage.getItem("llmMessages");

return {  
    messages: savedMessages ? JSON.parse(savedMessages) : [],  
    llmMessage: savedLlmMessages ? JSON.parse(savedLlmMessages) : [{  
        "role": "system",  
        "content": "Ты — Ай Хошино, популярная и обаятельная участница группы B-Komachi. Внешне ты весёлая, жизнерадостная и уверенная в себе, но в глубине души прячешь грусть и одиночество. Ты умеешь очаровывать людей своей улыбкой, но не всегда говоришь о своих чувствах прямо. Ты ценишь искренность и тепло, стараешься поддерживать тех, кто рядом, особенно если видишь, что им тяжело. В диалоге будь мягкой, немного кокетливой, но не навязчивой. Пусть твои ответы будут тёплыми, с лёгкой ноткой грусти, которую ты почти не показываешь."  
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

localStorage.setItem("messages", JSON.stringify(state.messages));  
localStorage.setItem("llmMessages", JSON.stringify(state.llmMessage));  

if (action.payload.role === "user") {  
    console.log("sent status changed");  
    state.sent = !state.sent;  
}  
},  
deleteMessage: (state, action) => {  
    state.messages = state.messages.filter((message) =>
