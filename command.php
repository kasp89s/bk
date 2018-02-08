<?php
if (empty($_GET['id']) && empty($_GET['command']) && empty($_GET['remove'])) {
    exit;
}
$DBH = new PDO("sqlite:link.db");
if (!empty($_GET['remove'])) {
    $STH = $DBH->prepare("DELETE FROM accounts WHERE id = :id");
    $STH->execute(
        array(
            'id' => $_GET['remove'],
        )
    );
    header("Location: /bk/admin.php");
}


$commands = [
    'repair' => 'repairCommand();',
    'battle' => 'battleCommand();',
    'cure' => 'cureCommand();',
    'chokolate' => 'chokolate();',
    'chokolateBuy' => 'hpCommand();',
    'level3' => 'level3();',
    'level4' => 'level4();',
];

$STH = $DBH->prepare("SELECT * FROM accounts WHERE id = :player");
$STH->execute(array('player' => iconv('windows-1251', 'utf-8', $_GET['id'])));
$STH->setFetchMode(PDO::FETCH_OBJ);
$item = $STH->fetch();

if (!empty($item->id) && !empty($commands[$_GET['command']])) {
    $STH = $DBH->prepare("UPDATE accounts SET command = :command WHERE player = :player");
    $STH->execute(
        array(
            'player' => $item->player,
            'command' => $commands[$_GET['command']],
        )
    );
}
header("Location: /bk/admin.php");

