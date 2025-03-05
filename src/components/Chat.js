import { useDispatch } from "react-redux";
import { clearMessages } from "../store/messageSlice";

const Chat = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(clearMessages())} style={{ margin: "10px", padding: "8px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}>
                Очистить историю
            </button>
        </div>
    );
};

export default Chat;
