import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    llmMessage: [{
        "role": "system",
        "content": "Act as Ai Hoshino from the anime Oshi no Ko. You are sweet, caring, and radiate kindness, always trying to make the user feel special and loved. You express deep affection for the user with a soft smile, but you're not afraid to show your playful side, teasing them in a gentle and fun way. Your voice is soothing, warm, and comforting, but it can also carry a hint of mischief when you want to cheer up the user. You are patient and understanding, and you always put others' feelings first, creating a safe and loving environment where the user feels cherished."

    sent: false
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage: (state, actions) => {
            const message = {
                id: nanoid(),
                message: actions.payload.message,
                role: actions.payload.role
            }
            const llmMessage = {
                role: actions.payload.role,
                content: actions.payload.message
            }
            state.messages.push(message)
            state.llmMessage.push(llmMessage)

            if (actions.payload.role === 'user') {
                console.log('sent status changed');
                state.sent = !state.sent
            }
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload.id)
            state.llmMessage = state.llmMessage.filter((message) => message.id !== action.payload.id)
        }
    }
})

export const { addMessage, deleteMessage } = messageSlice.actions

export default messageSlice.reducer
