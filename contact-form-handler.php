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
        // SMTP configuration for HostJaer using SSL
        $mail->isSMTP();
        $mail->Host = 'mail.hostjaer.com'; // HostJaer mail server
        $mail->SMTPAuth = true;
        $mail->Username = 'test@badgertechsolutions.co.ke'; // your new email
        $mail->Password = 'test2020!'; // your new password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // use SSL encryption
        $mail->Port = 465; // SSL port

        // Email settings
        $mail->setFrom('test@badgertechsolutions.co.ke', 'Badger Tech Solutions');
        $mail->addAddress('test@badgertechsolutions.co.ke'); // where messages are received
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission - Badger Tech Solutions';
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
        $confirm->Host = 'mail.hostjaer.com';
        $confirm->SMTPAuth = true;
        $confirm->Username = 'test@badgertechsolutions.co.ke';
        $confirm->Password = 'test2020!';
        $confirm->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $confirm->Port = 465;
        $confirm->setFrom('test@badgertechsolutions.co.ke', 'Badger Tech Solutions');
        $confirm->addAddress($email, $name);
        $confirm->isHTML(true);
        $confirm->Subject = 'Thank You for Contacting Badger Tech Solutions';
        $confirm->Body = "
            <p>Hi <strong>{$name}</strong>,</p>
            <p>Thank you for contacting <strong>Badger Tech Solutions</strong>. We’ve received your message and will get back to you shortly.</p>
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
