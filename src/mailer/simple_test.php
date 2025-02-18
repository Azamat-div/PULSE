<?php
$logFile = __DIR__ . '/simple_debug.log';

// Пробуем записать данные
if (file_put_contents($logFile, date('Y-m-d H:i:s') . " - Тестовая запись\n", FILE_APPEND)) {
    echo "✅ Запись в simple_debug.log выполнена успешно!";
} else {
    echo "❌ Ошибка при записи в simple_debug.log";
}
?>
