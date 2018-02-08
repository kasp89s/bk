<?php
   //создаем какое-то имя, ну, например: 
   $name = time().'.png';
  //записываем, не забывая перекодировать из base64
  file_put_contents(__DIR__ . '/../uploads/' . $name, base64_decode($_GET['data']));
  //отдаем обратно имя созданного файла 
  echo('<img src="data:image/png;base64,' . $_GET['data'] . '" />');
?>