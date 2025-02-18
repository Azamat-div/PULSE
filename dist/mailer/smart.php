<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('phpmailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Не указано';
$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : 'Не указано';
$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';

// Настройки SMTP
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'nietalinaz@gmail.com';
$mail->Password = 'jjop hdzo pinx lhil';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

// Отладка выводится на экран
$mail->SMTPDebug = 4; 
$mail->Debugoutput = 'html'; 

$mail->setFrom('nietalinaz@gmail.com', 'Pulse');
$mail->addAddress('nietalinaz@gmail.com');

$mail->isHTML(true);
$mail->Subject = 'Новая заявка с сайта';
$mail->Body = "
    <strong>Пользователь оставил данные:</strong><br>
    <b>Имя:</b> {$name} <br>
    <b>Телефон:</b> {$phone} <br>
    <b>Email:</b> {$email}
";

try {
    if(!$mail->send()) {
        throw new Exception('Ошибка отправки письма: ' . $mail->ErrorInfo);
    }
    echo '✅ Письмо успешно отправлено!';
} catch (Exception $e) {
    echo '❌ Произошла ошибка: ' . $e->getMessage();
}
?>


