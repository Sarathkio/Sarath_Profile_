<?php

// Set receiving email address
$receiving_email_address = 'sarathr9843@gmail.com';

// Check if the PHP email form library exists and include it
if (file_exists($php_email_form = '../assets/vendor/php-email-form/contact.php')) {
    include($php_email_form);
} else {
    die('Unable to load the "PHP Email Form" Library!');
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Error: Only POST requests are allowed');
}

// Initialize the contact form
$contact = new PHP_Email_Form;
$contact->ajax = true;

// Validate and sanitize input
$contact->from_name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$contact->from_email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
if (!$contact->from_email) {
    die('Error: Invalid email address');
}
$contact->subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);

// Load SMTP credentials securely
$contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => getenv('SMTP_USERNAME'),  // Set in environment variables
    'password' => getenv('SMTP_PASSWORD'),  // Set in environment variables
    'port' => '465', // For SSL
    'encryption' => 'ssl' // Use 'ssl'
);

// Add form messages
$contact->add_message($contact->from_name, 'From');
$contact->add_message($contact->from_email, 'Email');
$contact->add_message(filter_var($_POST['message'], FILTER_SANITIZE_STRING), 'Message', 10);

// Send the email and output the result
echo $contact->send();

?>
