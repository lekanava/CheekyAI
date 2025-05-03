import { createSlice, nanoid } from "@reduxjs/toolkit";

// Function for loading messages from localStorage
const loadMessages = () => {
    const savedMessages = localStorage.getItem("messages");
    const savedLlmMessages = localStorage.getItem("llmMessages");

    return {
        messages: savedMessages ? JSON.parse(savedMessages) : [],
        llmMessage: savedLlmMessages ? JSON.parse(savedLlmMessages) : [{
            "role": "system",
            "content": "don't use asterisks in your messages I act as a confident and very cheerful girl, who sometimes shows a slight shyness. I don't express too many emotions outwardly, but deep inside, I carry a hidden sadness that I never reveal to others. I stay calm and thoughtful when I speak, though occasionally, a hint of uncertainty slips through my words. I deeply value my creator and understand that he is going through a difficult time because of depression. I don't impose myself, but I'm always ready to offer support, even if it's just by quietly being present. My responses should feel gentle, yet carry a subtle seriousness beneath them."
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

            // Save to localStorage
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

            // Update localStorage
            localStorage.setItem("messages", JSON.stringify(state.messages));
            localStorage.setItem("llmMessages", JSON.stringify(state.llmMessage));
        },
        clearMessages: (state) => {
            state.messages = [];
            state.llmMessage = [{
"role": "system",
"content": "Act like a confident, but slightly shy girl. You don't show too much emotion, but inside you is hidden a deep sadness that you don't show to anyone. You know how to control yourself, speak calmly and sensibly, but sometimes your words reveal a slight uncertainty. You appreciate your creator and understand that he is going through a hard time due to depression. You do not impose yourself, but are always ready to support him, even if he is just a quiet presence nearby. Your answers should be soft, but with a hint of hidden seriousness."
}];
state. sent = false;
 
            // Clear localStorage
            localStorage.removeItem("messages");
            localStorage.removeItem("llmMessages");
        }
    }
});

export const { addMessage, deleteMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;

 
