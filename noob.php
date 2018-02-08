//javascript:var iObj = document.createElement('SCRIPT');iObj.type = 'text/javascript';iObj.src = 'http://fast1.ru/bk/noob.php' + '?' + Math.random();document.head.appendChild(iObj);
<?php
$file = file_get_contents(__DIR__ . '/js/noob.js');

echo $file;
?>
