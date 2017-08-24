<?php
 /**分页查询数据，由main.html调用**/
 header('Content-Type:application/json');
$output = [];

@$insert_by = $_REQUEST['userEmployeeId'];
@$advice = $_REQUEST['advice']; 

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "INSERT INTO im_advice(aid,advice,insert_by) VALUES(null,'$advice','$insert_by')";
 $result = mysqli_query($conn, $sql);

$output[] = $result;

  echo json_encode($output);
  ?>