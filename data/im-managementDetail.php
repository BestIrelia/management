<?php
 /**分页查询数据，由main.html调用**/
 header('Content-Type:application/json');
$output = [];

@$mid = $_REQUEST['mid'];  //@符号可以压制当前行产生的错误提示

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT name,phone,email,department,job,employee_id,id_card,address FROM  im_employee  WHERE mid=$mid";
 $result = mysqli_query($conn, $sql);

$row = mysqli_fetch_assoc($result); 
	
$output[] = $row;

  echo json_encode($output);
  ?>