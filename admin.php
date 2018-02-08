<?php
define('LOGIN', 'demo');
define('PASSWORD', 'demo');

if ($_SERVER['PHP_AUTH_USER'] != LOGIN || $_SERVER['PHP_AUTH_PW'] != PASSWORD) {
    header('WWW-Authenticate: Basic realm="My Realm"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Cancel';
    exit;
} else {
$DBH = new PDO("sqlite:link.db");
/*
$STH = $DBH->prepare("ALTER TABLE accounts ADD COLUMN kredits TEXT DEFAULT NULL;");
$STH->execute();
exit;
*/
$STH = $DBH->prepare("SELECT * FROM accounts");
$STH->execute();
$STH->setFetchMode(PDO::FETCH_OBJ);
$items = $STH->fetchAll();
?>
<html>
<head>
    <meta charset="utf-8">
</head>
<h4>Имеем <?= count($items)?> ботов</h4>
<h3>Основа</h3>
<table>
    <tr>
        <th>Игрок</th>
        <th>Опыт</th>
        <th>Дневной профит</th>
        <th>Кредиты</th>
        <th>Онлайн</th>
        <th>IP</th>
        <th>Команда в очереди</th>
        <th></th>
    </tr>
    <?php $totalKr = 0; foreach ($items as $item):?>
		<?php if($item->exp < 300000) continue;?>
		<?php
		$dailyExp = 0;
		$totalKr+= $item->kredits;
		if (!empty($item->lastExp)) {
			$lastExp = explode('/', $item->lastExp);
			$dailyExp = $item->exp - $lastExp[1];
		}
		?>
        <tr>
            <td>
		<?= $item->player?>
                <a href="http://dreamscity.combats.com/inf.pl?<?= $item->player?>" target="_blank"><img src="http://img.combats.com/i/inf.gif" width="12" height="11"></a>
				<?php if ($item->travma != 'false'):?>
					<img src="<?= $item->travma?>" />
				<?php endif;?>
	    </td>
            <td><?= number_format($item->exp) ?></td>
			<td><b><?= number_format($dailyExp) ?></b></td>
			<td><b><?= number_format($item->kredits) ?></b> кр</td>
            <td><?= (time() - $item->requestTime) > 1200 ? '-' : '+'?></td>
			<td><?= $item->ip?></td>
            <td><?= $item->command?></td>
            <td>
			    <a href="/bk/command.php?command=battle&login=<?= $item->player?>">[battle]</a>
                <a href="/bk/command.php?remove=<?= $item->id?>">[delete]</a>
            </td>
        </tr>
    <?php endforeach;?>
		<tr>
            <td><b>Нафармили</b></td>
			<td></td>
			<td></td>
            <td><b><?= number_format($totalKr) ?></b> кр</td>
			<td></td>
            <td></td>
            <td>
            </td>
        </tr>
</table>


<h3>Песок</h3>
<table>
    <tr>
        <th>Игрок</th>
        <th>Опыт</th>
        <th>Дневной профит</th>
        <th>Онлайн</th>
		<th>IP</th>
        <th>Команда в очереди</th>
        <th></th>
    </tr>
    <?php foreach ($items as $item):?>
		<?php if($item->exp > 300000) continue;?>
		<?php
		$dailyExp = 0;

		if (!empty($item->lastExp)) {
			$lastExp = explode('/', $item->lastExp);
			$dailyExp = $item->exp - $lastExp[1];
		}
		?>
        <tr>
            <td>
		<?= $item->player?>
        <?php
//            preg_match('/[0-9]{1,2}\/[0-9]{1,2}/', $item->iznos, $match);
//            if (!empty($match[0])) {
//                echo '(' . $match[0] . ')';
//            }
        ?>
                <?= $item->iznos?>
                <a href="http://dreamscity.combats.com/inf.pl?<?= $item->player?>" target="_blank"><img src="http://img.combats.com/i/inf.gif" width="12" height="11"></a>
				<?php if ($item->travma != 'false'):?>
					<img src="<?= $item->travma?>" />
				<?php endif;?>
				<?php if ($item->chokolate != 'false'):?>
					<img src="<?= $item->chokolate?>" />
				<?php endif;?>
	    </td>
            <td><?= number_format($item->exp) ?></td>
			<td><b><?= number_format($dailyExp) ?></b></td>
            <td><?= (time() - $item->requestTime) > 1200 ? '-' : '+'?></td>
            <td><?= $item->ip?></td>
            <td><?= $item->command?></td>
            <td>
                <a href="/bk/command.php?command=battle&id=<?= $item->id?>">[battle]</a>
                <a href="/bk/command.php?command=repair&id=<?= $item->id?>">[repair]</a>
                <a href="/bk/command.php?command=cure&id=<?= $item->id?>">[cure]</a>
                <a href="/bk/command.php?command=chokolate&id=<?= $item->id?>">[chokolate]</a>
                <a href="/bk/command.php?command=chokolateBuy&id=<?= $item->id?>">[chokolate_buy]</a>
                <a href="/bk/command.php?command=level3&id=<?= $item->id?>">[level3]</a>
                <a href="/bk/command.php?command=level4&id=<?= $item->id?>">[level4]</a>
                <a href="/bk/command.php?remove=<?= $item->id?>">[delete]</a>
            </td>
        </tr>
    <?php endforeach;?>
</table>
<?php } ?>

<?php 
	$ethmine = json_decode(file_get_contents('https://etc.ethermine.org/api/miner_new/92de5438796c0a44441a3f5b3fcb4a80ac0e25c0'));
    $crypt = json_decode(file_get_contents('https://api.cryptonator.com/api/ticker/etc-usd'));
?>
<?= 'https://etc.ethermine.org/api/miner_new/92de5438796c0a44441a3f5b3fcb4a80ac0e25c0'?> <br />
Hashrate: <?= $ethmine->hashRate?> <br />
Balance: <?= round($ethmine->unpaid / 1000000000000000000, 5)?><br />
Price: <?= $crypt->ticker->price?><br />
Amount: <?= round(round($ethmine->unpaid / 1000000000000000000, 5) * $crypt->ticker->price, 2)?><br />
</html>

