<?php
   //������� �����-�� ���, ��, ��������: 
   $name = time().'.png';
  //����������, �� ������� �������������� �� base64
  file_put_contents(__DIR__ . '/../uploads/' . $name, base64_decode($_GET['data']));
  //������ ������� ��� ���������� ����� 
  echo('<img src="data:image/png;base64,' . $_GET['data'] . '" />');
?>