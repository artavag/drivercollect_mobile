<?php
print_r($_POST);

//$load->library('email');
include_once 'Email.php';

$email = new CI_Email();

print_r($email);

$email->from('arto.avag@mail.ru', 'Your Name');
$email->to('artavazd2009@yahoo.es');
//$email->cc('another@another-example.com');
//$email->bcc('them@their-example.com');

$email->subject('Email Test');
$email->message('Testing the email class.');

$email->send();
//
echo $email->print_debugger();