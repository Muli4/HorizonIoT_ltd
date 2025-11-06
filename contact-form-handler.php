<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $country = htmlspecialchars(trim($_POST['country']));
    $message = htmlspecialchars(trim($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        // ✅ Gmail SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'horizoniot2023@gmail.com';
        $mail->Password = 'jcen qhlp muwv xpkp'; // App password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // ✅ Enable Debugging (for testing only)
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = 'html';

        // === Send form submission to your email ===
        $mail->setFrom('horizoniot2023@gmail.com', 'Horizon IoT LTD');
        $mail->addAddress('horizoniot2023@gmail.com');
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

        $mail->send();

        // === Send acknowledgment to the user ===
        $replyMail = new PHPMailer(true);
        $replyMail->isSMTP();
        $replyMail->Host = 'smtp.gmail.com';
        $replyMail->SMTPAuth = true;
        $replyMail->Username = 'horizoniot2023@gmail.com';
        $replyMail->Password = 'jcen qhlp muwv xpkp';
        $replyMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $replyMail->Port = 587;

        $replyMail->setFrom('horizoniot2023@gmail.com', 'Horizon IoT LTD');
        $replyMail->addAddress($email, $name);
        $replyMail->isHTML(true);
        $replyMail->Subject = 'Thank you for contacting Horizon IoT LTD';
        $replyMail->Body = "
            <h2>Hi {$name},</h2>
            <p>Thank you for reaching out to Horizon IoT LTD. We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Your Message:</strong><br>{$message}</p>
            <br>
            <p>Best regards,<br>Horizon IoT LTD Team</p>
        ";

        $replyMail->send();

        echo "<script>alert('✅ Message sent successfully! Thank you for contacting us.'); window.history.back();</script>";

    } catch (Exception $e) {
        echo "<h3 style='color:red;'>❌ Message could not be sent.</h3>";
        echo "<pre><strong>Error details:</strong><br>" . $mail->ErrorInfo . "</pre>";
    }
}
?>
