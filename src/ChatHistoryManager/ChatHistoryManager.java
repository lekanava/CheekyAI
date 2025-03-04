import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ChatHistoryManager {

    private static final String FOLDER_PATH = "chat_history/";

    // Сохранение сообщения в файл пользователя
    public static void saveMessage(String userId, String message, String role) {
        try {
            File folder = new File(FOLDER_PATH);
            if (!folder.exists()) {
                folder.mkdir(); // Создаём папку, если её нет
            }

            String filePath = FOLDER_PATH + "user_" + userId + ".json";
            JSONArray messages = loadMessages(userId); // Загружаем старые сообщения

            // Создаём новое сообщение
            JSONObject newMessage = new JSONObject();
            newMessage.put("role", role);
            newMessage.put("message", message);

            messages.put(newMessage); // Добавляем в массив

            // Сохраняем в файл
            FileWriter file = new FileWriter(filePath);
            file.write(messages.toString(4)); // 4 - красивый отступ
            file.flush();
            file.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Загрузка истории сообщений пользователя
    public static JSONArray loadMessages(String userId) {
        try {
            String filePath = FOLDER_PATH + "user_" + userId + ".json";
            File file = new File(filePath);

            if (!file.exists()) {
                return new JSONArray(); // Если файла нет, возвращаем пустой массив
            }

            String content = new String(Files.readAllBytes(Paths.get(filePath)));
            return new JSONArray(content);

        } catch (Exception e) {
            e.printStackTrace();
            return new JSONArray();
        }
    }

    // Пример использования
    public static void main(String[] args) {
        String userId = "123"; // Уникальный идентификатор пользователя

        saveMessage(userId, "Привет, как дела?", "user");
        saveMessage(userId, "Привет! Всё хорошо, а у тебя?", "bot");

        // Выводим историю сообщений
        JSONArray history = loadMessages(userId);
        System.out.println("История сообщений пользователя " + userId + ":");
        System.out.println(history.toString(4));
    }
}
