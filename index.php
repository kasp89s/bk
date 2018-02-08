<?php
if (empty($_GET['login']) || empty($_GET['exp'])) {
    exit;
}

$DBH = new PDO("sqlite:link.db");
/*
$STH = $DBH->query(
    'CREATE TABLE if not exists accounts
 (
 id INTEGER PRIMARY KEY,
 player TEXT,
 lastExp TEXT,
 exp TEXT,
 command TEXT,
 requestTime TEXT
 )'
);
*/
$exp = (int) str_replace(' ', '', $_GET['exp']);

$STH = $DBH->prepare("SELECT * FROM accounts WHERE player = :player");
$STH->execute(array('player' => iconv('windows-1251', 'utf-8', $_GET['login'])));
$STH->setFetchMode(PDO::FETCH_OBJ);
$item = $STH->fetch();

if (empty($item->id)) {
    $STH = $DBH->prepare(
        "INSERT INTO accounts (player, exp, command, requestTime, lastExp, ip, travma) VALUES (:player, :exp, :command, :requestTime, :lastExp, :ip, :travma)"
    );
    $STH->execute(
        array(
            'player' => iconv('windows-1251', 'utf-8', $_GET['login']),
            'lastExp' => date('Y-m-d', time()) . '/' . $exp,
            'exp' => $exp,
            'command' => null,
            'ip' => $_SERVER['REMOTE_ADDR'],
            'travma' => $_GET['travma'],
            'requestTime' => time()
        )
    );
} else {
    $lastExp = explode('/', $item->lastExp);
    
    if (date('Y-m-d', time()) != $lastExp[0] || empty($lastExp[1])) {
        $lastExp = date('Y-m-d', time()) . '/' . $exp;
    } else {
        $lastExp = $item->lastExp;
    }

    $command = $item->command;

    preg_match('/[0-9]{1,2}\/[0-9]{1,2}/', $_GET['iznos'], $match);

    if (!empty($match[0]))
    {
        $durability = $match[0];
        $iznos = explode('/', $match[0]);
        $difference = $iznos[1] - $iznos[0];

        if ($difference < 5 && $command != 'repairCommand();') {
            $command = 'repairCommand();';
        }
    }

    $STH = $DBH->prepare("UPDATE accounts SET exp = :exp, requestTime = :requestTime, command = :command, lastExp = :lastExp, ip = :ip, travma = :travma, iznos = :iznos, chokolate = :chokolate , kredits = :kredits WHERE player = :player");
    $STH->execute(
        array(
            'player' => iconv('windows-1251', 'utf-8', $_GET['login']),
            'lastExp' => $lastExp,
            'exp' => !empty($exp) ? $exp : $item->exp,
            'command' => null,
			'ip' => $_SERVER['REMOTE_ADDR'],
			'travma' => $_GET['travma'],
			'iznos' => !empty($durability) ? $durability . "[$difference]": null,
			'chokolate' => $_GET['chokolate'],
			'kredits' => (int) str_replace(' ', '', $_GET['kredits']),
            'requestTime' => time()
        )
    );

    header('Content-Type: text/javascript; charset="utf-8"');
    echo $command;
}

