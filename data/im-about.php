<?php
 /**关于我们——APP描述信息，由about.html调用**/
 header('Content-Type:application/json');
$output = [];

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT * FROM  im_about";
 $result = mysqli_query($conn, $sql);

$row = mysqli_fetch_assoc($result); 
	
$output[] = $row;

  echo json_encode($output);
  ?>