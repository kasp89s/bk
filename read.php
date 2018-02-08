<html>
<head>
    <meta charset="utf-8">
</head>
<body>
<script type="text/javascript">
    setTimeout(function () {
        window.location.href = ''
    }, 10000)
</script>
<?php
$DBH = new PDO("sqlite:link.db");
$STH = $DBH->prepare("SELECT * FROM chat");
$STH->execute();
$STH->setFetchMode(PDO::FETCH_OBJ);
$chatItems = $STH->fetchAll();

if (!empty($chatItems)) {
    $text = '';
    foreach ($chatItems as $item) {
        $text = $item->message . "\n" . $text;
    }

    echo "<h3>Чат</h3><textarea style='width: 800px; height: 400px'>$text</textarea>";
}
?>
</body>
</html>
