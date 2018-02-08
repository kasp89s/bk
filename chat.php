<?php
    $DBH = new PDO("sqlite:link.db");
    $STH = $DBH->query(
        'CREATE TABLE if not exists chat
             (
                 id INTEGER PRIMARY KEY,
                 message TEXT
             )'
    );

$STH = $DBH->prepare("DELETE FROM chat WHERE 1");
$STH->execute();

if (!empty($_GET['text'])) {
    $items = explode('|', $_GET['text']);
    foreach ($items as $item) {
        $STH = $DBH->prepare("INSERT INTO chat (message) VALUES (:message)");
        $STH->execute(
            array(
                'message' => iconv('windows-1251', 'utf-8', $item),
            )
        );
    }

}
