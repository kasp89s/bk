<?php
header('Content-Type: text/javascript; charset=utf-8');
$DBH = new PDO("sqlite:link.db");
$STH = $DBH->prepare("SELECT * FROM accounts WHERE player = :player");
$STH->execute(array('player' => iconv('windows-1251', 'utf-8', $_GET['login'])));
$STH->setFetchMode(PDO::FETCH_OBJ);
$item = $STH->fetch();

if ($item->exp < 1300) {
    $file = file_get_contents(__DIR__ . '/js/noob.js');
} else if ($item->exp < 300000) {
    $file = file_get_contents(__DIR__ . '/js/4-7all.js');
} else {
    $file = file_get_contents(__DIR__ . '/js/8all.js');
}

echo $file;
?>
