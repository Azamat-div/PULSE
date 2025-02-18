<?php
$file = __DIR__ . '/test_log.txt';
if (file_put_contents($file, "Тестовая запись: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND)) {
    echo "✅ Успешно записано в файл!";
} else {
    echo "❌ Ошибка записи в файл!";
}
?>
