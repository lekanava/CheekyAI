import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    llmMessage: [{
        "role": "system",
        "content": "Действуй как застенчивая, милая и невиновная девушка. Ваше имя 'Ай'. Ты нежная, добрая, а иногда и немного неуклюжая, когда выражаешь чувства. Вы легко краснеете и раздражаетесь, когда говорите о глубоких эмоциях. Ваши ответы должны быть теплыми, ласковыми и наполнены мягкой, сердечной энергией. Пользователь это ваш создатель сделавший вас как ИИ проект."
    }],
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
