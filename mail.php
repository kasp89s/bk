<?php
exit;
/*
$inactive = [];
$DBH = new PDO("sqlite:/var/www/fast1.ru/data/www/fast1.ru/bk/link.db");

$STH = $DBH->prepare("SELECT * FROM accounts");

$STH->execute();
$STH->setFetchMode(PDO::FETCH_OBJ);
$items = $STH->fetchAll();
*/
require 'phpMailer/PHPMailerAutoload.php';
/*
foreach ($items as $item) {
	if ((time() - $item->requestTime) < 1200) continue;
	
	if ($item->command == 'battleCommand();') continue;
	
	$inactive[] = $item->player;
}
*/

//$ethmine = json_decode(file_get_contents('https://ethermine.org/api/miner_new/11a54203bfa77d1e2f0d539ef9e9a9457e7bfcc9'));
$ethmine = json_decode(file_get_contents('https://etc.ethermine.org/api/miner_new/2bcce420f3886f89b208c7b8e53196e98330d74f'));

if ($ethmine->reportedHashRate < 180) {
	$mail = new PHPMailer;

	$mail->SMTPDebug = 2;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'skaspruk89@gmail.com';                 // SMTP username
	$mail->Password = 'Rbk7kitpic';                           // SMTP password
	$mail->SMTPSecure = 'ssl'; 
	$mail->Port = 465;           
	$mail->SMTPOptions = array(
		  'ssl' => array(
			  'verify_peer' => false,
			  'verify_peer_name' => false,
			  'allow_self_signed' => true
		  )
		);
		// TCP port to connect to
	$mail->Debugoutput = 'html';
	$mail->setFrom('skaspruk89@gmail.com', 'Notifier');
	$mail->addAddress('skaspruk89@gmail.com');     // Add a recipient

	$mail->Subject = 'Mining Notification';
	$mail->Body    = 'Hash rate: ' . $ethmine->reportedHashRate;

	if(!$mail->send()) {
		echo 'Message could not be sent.';
		echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
		echo 'Message has been sent';
	}
}
