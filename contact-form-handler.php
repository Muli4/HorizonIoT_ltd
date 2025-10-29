<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer library
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $country = htmlspecialchars(trim($_POST['country']));
    $message = htmlspecialchars(trim($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        // SMTP configuration for HostAfrica using TLS
        $mail->isSMTP();
        $mail->Host = 'mail.horizoniotltd.com'; // HostAfrica mail server
        $mail->SMTPAuth = true;
        $mail->Username = 'info@horizoniotltd.com'; // your email
        $mail->Password = 'HorizonIoT43!'; // your password
        $mail->SMTPSecure = 'tls'; // TLS encryption
        $mail->Port = 587; // TLS port

        // Email settings
        $mail->setFrom('info@horizoniotltd.com', 'Horizon IoT LTD');
        $mail->addAddress('info@horizoniotltd.com'); // where messages are received
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission - Horizon IoT LTD';
        $mail->Body = "
            <h2>New Message from Website Contact Form</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Country:</strong> {$country}</p>
            <p><strong>Message:</strong><br>{$message}</p>
        ";

        // Send to your inbox
        $mail->send();

        // Optional confirmation email to sender
        $confirm = new PHPMailer(true);
        $confirm->isSMTP();
        $confirm->Host = 'mail.horizoniotltd.com';
        $confirm->SMTPAuth = true;
        $confirm->Username = 'info@horizoniotltd.com';
        $confirm->Password = 'HorizonIoT43!';
        $confirm->SMTPSecure = 'tls';
        $confirm->Port = 587;
        $confirm->setFrom('info@horizoniotltd.com', 'Horizon IoT LTD');
        $confirm->addAddress($email, $name);
        $confirm->isHTML(true);
        $confirm->Subject = 'Thank You for Contacting Horizon IoT LTD';
        $confirm->Body = "
            <p>Hi <strong>{$name}</strong>,</p>
            <p>Thank you for contacting <strong>Horizon IoT LTD</strong>. We’ve received your message and will get back to you shortly.</p>
            <hr>
            <p><em>This is an automated confirmation email — please don’t reply.</em></p>
        ";
        $confirm->send();

        echo "<script>alert('✅ Message sent successfully! Thank you for contacting us.'); window.history.back();</script>";

    } catch (Exception $e) {
        echo "<script>alert('❌ Message could not be sent. Error: {$mail->ErrorInfo}'); window.history.back();</script>";
    }
}
?>
